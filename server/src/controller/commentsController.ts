import { Types, HydratedDocument } from "mongoose";
import { RequestHandler } from "express";

// Models
import commentModel from "../models/commentModel.js";
import userModel from "../models/userModel.js";
import locationModel from "../models/locationModel.js";

// Types
import { Comment, PopulatedComment } from "../types/CommentTypes.js";
import { User } from "../types/UserTypes.js";
import { Location } from "../types/LocationTypes.js";

const addNewComment: RequestHandler = async (req, res) => {
  // Specify req body type
  const input: {
    comment: string;
    createdAt: string;
    author: string;
    relatedPost: string;
  } = req.body;

  // Convert incoming data to type matching model
  const createdAt = new Date(input.createdAt);
  const authorId = new Types.ObjectId(input.author);
  const relatedPostId = new Types.ObjectId(input.relatedPost);

  //Create a new comment object
  const newComment: HydratedDocument<Comment> = new commentModel({
    comment: input.comment,
    createdAt: createdAt,
    author: authorId,
    relatedPost: relatedPostId,
  });

  try {
    // Save a new comment in db
    const savedComment: HydratedDocument<Comment> = await newComment.save();

    if (savedComment) {
      // Update user posting a comment
      const commentAuthor: HydratedDocument<User> | null =
        await userModel.findByIdAndUpdate(
          savedComment.author,
          { $push: { comments: savedComment.id } },
          { new: true }
        );

      // Update location with a new comment
      const commentedLocation: HydratedDocument<Location> | null =
        await locationModel.findByIdAndUpdate(
          savedComment.relatedPost,
          { $push: { comments: savedComment.id } },
          { new: true }
        );

      // Return a feedback about a new post
      res.status(201).json({
        msg: "Comment added successfully",
        comment: {
          comment: savedComment.comment,
          createdAt: savedComment.createdAt,
          author: commentAuthor?.userName,
          relatedPost: commentedLocation?.title,
        },
      });
    } else {
      res.status(418).json({
        msg: "I'm a teapot!",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Adding new comment failed",
    });
  }
};

const deleteComment: RequestHandler = async (req, res) => {
  try {
    // Find comment and populate only ids
    let comment: HydratedDocument<PopulatedComment> | null = await commentModel
      .findById(req.body._id)
      .populate({ path: "author", select: ["_id"] })
      .populate({ path: "relatedPost", select: ["_id"] });

    // find comment author and delete comment id
    let updateUser = await userModel.findByIdAndUpdate(
      comment?.author?.id,
      { $pull: { comments: comment?._id } },
      { new: true }
    );

    // find commented location and delete comment id
    let updateLocation: HydratedDocument<Location> | null =
      await locationModel.findByIdAndUpdate(
        comment?.relatedPost,
        { $pull: { comments: comment?._id } },
        { new: true }
      );

    // delete the comment
    let commentDelete: HydratedDocument<Comment> | null =
      await commentModel.findByIdAndDelete(req.body._id);

    res.status(200).json({
      msg: `Comment - ${commentDelete?.comment}, added by - ${updateUser?.userName}, on location title - ${updateLocation?.title}, deleted successfully!!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
    });
  }
};

const editComment = async (req, res) => {
  try {
    const updatedComment = await commentModel.findByIdAndUpdate(
      req.body.commentId,
      {
        comment: req.body.updatedComment,
        isEdited: true,
        editedAt: req.body.editedAt,
      },
      { new: true }
    );
    if (updatedComment) {
      res.status(200).json({
        msg: "Comment updated properly!",
        updatedVal: updatedComment.comment,
        editDate: updatedComment.editedAt,
      });
    } else {
      res.status(404).json({
        msg: "User with provided id not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Server error!",
    });
  }
};

export { addNewComment, deleteComment, editComment };
