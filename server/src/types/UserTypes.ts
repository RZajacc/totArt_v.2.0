import { Types, Document } from "mongoose";
import { Image } from "./ImageTypes";

export interface User extends Document {
  userName: string;
  email: string;
  password: string;
  userImage?: Types.ObjectId | Image;
  userWebsite?: string;
  userBio?: string;
  posts: Types.ObjectId[];
  favs: Types.ObjectId[];
  comments: Types.ObjectId[];
}

export interface PopulatedUser extends Document {
  userName: string;
  email: string;
  password: string;
  userImage?: { _id: string; public_id: string };
  userWebsite?: string;
  userBio?: string;
  posts: [{ _id: string; image: { _id: string; public_id: string } }];
  favs: Types.ObjectId[];
  comments: Types.ObjectId[];
}
