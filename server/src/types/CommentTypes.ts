import { Types, Document } from "mongoose";

export interface Comment extends Document {
  comment: string;
  createdAt: Date;
  editedAt?: string;
  isEdited?: boolean;
  author: Types.ObjectId;
  relatedPost: Types.ObjectId;
}
