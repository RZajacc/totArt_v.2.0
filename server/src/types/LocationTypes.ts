import { Types, Document } from "mongoose";

export interface Location extends Document {
  title: string;
  description: string;
  location: string;
  image: Types.ObjectId;
  author: Types.ObjectId;
  favs: Types.ObjectId[];
  comments: Types.ObjectId[];
}
