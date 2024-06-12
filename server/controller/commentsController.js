import commentModel from "../models/commentModel.js";
import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";

const addNewComment = async (req, res) => {
  //Create a new comment object
  const newComment = new commentModel({
    comment: req.body.comment,
    createdAt: req.body.createdAt,
    author: req.body.author,
    relatedPost: req.body.relatedPost,
  });

  try {
    // Save a new comment in db
    const savedComment = await newComment.save();

    if (savedComment) {
      // Update user posting a comment
      const commentAuthor = await userModel.findByIdAndUpdate(
        savedComment.author,
        { $push: { comments: savedComment.id } },
        { new: true }
      );

      // Update location with a new comment
      const commentedLocation = await postModel.findByIdAndUpdate(
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
          author: commentAuthor.userName,
          relatedPost: commentedLocation.title,
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

const deleteComment = async (req, res) => {
  try {
    // Find comment and populate only ids
    let comment = await commentModel
      .findById(req.body._id)
      .populate({ path: "author", select: ["_id"] })
      .populate({ path: "relatedPost", select: ["_id"] });

    // find comment author and delete comment id
    let updateUser = await userModel.findByIdAndUpdate(
      comment.author._id,
      { $pull: { comments: comment._id } },
      { new: true }
    );

    // find commented location and delete comment id
    let updateLocation = await postModel.findByIdAndUpdate(
      comment.relatedPost,
      { $pull: { comments: comment._id } },
      { new: true }
    );

    // delete the comment
    let commentDelete = await commentModel.findByIdAndDelete(req.body._id);

    res.status(200).json({
      msg: `Comment - ${commentDelete.comment}, added by - ${updateUser.userName}, on location title - ${updateLocation.title}, deleted successfully!!`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
    });
  }
};

export { addNewComment, deleteComment };
