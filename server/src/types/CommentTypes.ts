import { Types, Document } from "mongoose";

export interface Comment extends Document {
  comment: string;
  createdAt: Date;
  editedAt?: Date;
  isEdited?: boolean;
  author: Types.ObjectId;
  relatedPost: Types.ObjectId;
}
