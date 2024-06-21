import mongoose from "mongoose";
import { User } from "../types/UserTypes";

const userSchema = new mongoose.Schema<User>({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    required: false,
  },
  userWebsite: {
    type: String,
    required: false,
  },
  userBio: {
    type: String,
    required: false,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "location" }],
  favs: [{ type: mongoose.Schema.Types.ObjectId, ref: "location" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

const userModel = mongoose.model<User>("user", userSchema);

export default userModel;
