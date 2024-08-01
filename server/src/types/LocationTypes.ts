import { Types, Document } from "mongoose";
import { Image } from "./ImageTypes";
import { User } from "./UserTypes";
import { Comment } from "./CommentTypes";

export interface Location extends Document {
  title: string;
  description: string;
  location: string;
  image: Types.ObjectId;
  author: Types.ObjectId;
  favs: Types.ObjectId[];
  comments: Types.ObjectId[];
}

export interface PopulatedLocation extends Document {
  title: string;
  description: string;
  location: string;
  image: Image;
  author: User;
  favs: Types.ObjectId[];
  comments: Types.ObjectId[];
}

export interface PopulatedLocationDetails extends Document {
  title: string;
  description: string;
  location: string;
  image: Image | null;
  author: User | null;
  favs: Types.ObjectId[];
  comments: Comment | null;
}
