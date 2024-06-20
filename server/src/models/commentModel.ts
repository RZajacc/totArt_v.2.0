import { Schema, model } from "mongoose";
import { Comment } from "../types/CommentTypes";

const commentSchema = new Schema<Comment>({
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  editedAt: {
    type: Date,
    required: false,
  },
  isEdited: {
    type: Boolean,
    required: false,
  },
  author: { type: Schema.Types.ObjectId, ref: "user" },
  relatedPost: { type: Schema.Types.ObjectId, ref: "location" },
});

const commentModel = model<Comment>("comment", commentSchema);

export default commentModel;
