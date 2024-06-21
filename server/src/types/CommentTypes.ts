import { Types, Document } from "mongoose";
import { User } from "./UserTypes";

export interface Comment extends Document {
  comment: string;
  createdAt: Date;
  editedAt?: Date;
  isEdited?: boolean;
  author: Types.ObjectId;
  relatedPost: Types.ObjectId;
}

export interface PopulatedComment extends Document {
  comment: string;
  createdAt: Date;
  editedAt?: Date;
  isEdited?: boolean;
  author: User | null;
  relatedPost: Location | null;
}
