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

    // Update user posting a comment
    const commentAuthor = await userModel.findByIdAndUpdate(
      savedComment.author,
      { $push: { comments: savedComment.id } },
      { new: true }
    );

    // Update location with a new comment
    const commentedLocation = await postModel.findByIdAndUpdate(
      savedComment.relatedPost,
      { $push: { comments: savedComment.id } }
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
  } catch (error) {
    res.status(500).json({
      msg: "Adding new comment failed",
    });
  }
};

const deleteComment = async (req, res) => {
  let comment = await commentModel
    .findById(req.body._id)
    .populate({ path: "author", select: ["_id"] })
    .populate({ path: "relatedPost", select: ["_id"] });

  // console.log(comment);
  let updateUser = await userModel.findOneAndUpdate(
    { _id: comment.author._id },
    { $pull: { comments: comment._id } },
    { new: true }
  );
  console.log(updateUser);
  let updatePost = await postModel.findOneAndUpdate(
    { _id: comment.relatedPost._id },
    { $pull: { comments: comment._id } },
    { new: true }
  );

  let commentDelete = await commentModel.findByIdAndDelete(req.body._id);

  res.json({ msg: "Comment deleted successfully" });
};

export { addNewComment, deleteComment };
