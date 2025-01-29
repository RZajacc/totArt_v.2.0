import { Types } from "mongoose";
import { User } from "../../types/UserTypes";

export {};

declare global {
  namespace Express {
    interface User {
      id: Types.ObjectId;
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
  }
}
