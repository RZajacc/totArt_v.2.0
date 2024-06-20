import { Schema, Document } from "mongoose";

export interface Comment extends Document {
  comment: string;
  createdAt: Date;
  editedAt?: string;
  isEdited?: boolean;
  author: Schema.Types.ObjectId;
  relatedPost: Schema.Types.ObjectId;
}
