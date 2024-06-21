import { Types, Document } from "mongoose";

export interface User extends Document {
  userName: string;
  email: string;
  password: string;
  userImage?: string;
  userWebsite?: string;
  userBio?: string;
  posts: Types.ObjectId[];
  favs: Types.ObjectId[];
  comments: Types.ObjectId[];
}
