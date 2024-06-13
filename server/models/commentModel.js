import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  editeddAt: {
    type: Date,
    required: false,
  },
  isEdited: {
    type: Boolean,
    required: false,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  relatedPost: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
});

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
