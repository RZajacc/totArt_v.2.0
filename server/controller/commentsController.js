import commentModel from "../models/commentModel.js";
import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";

const addNewComment = async (req, res) => {
  console.log(req.body);

  // Dodaj post tak jak jest
  // Jeżeli udało sie dodać post to znajdź użytkownika po id
  // Dodaj do jego listy komentarzy id utworzonego komenta
  // To samo z zrób z samym postem

  const newComment = new commentModel({
    comment: req.body.comment,
    createdAt: req.body.createdAt,
    author: req.body.author,
    relatedPost: req.body.relatedPost,
  });

  try {
    const savedComment = newComment.save();
    res.status(201).json({
      msg: "Comment added successfully",
      comment: newComment,
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
