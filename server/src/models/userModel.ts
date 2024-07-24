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
  userWebsite: {
    type: String,
    required: false,
  },
  userBio: {
    type: String,
    required: false,
  },
  userImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "image",
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "location" }],
  favs: [{ type: mongoose.Schema.Types.ObjectId, ref: "location" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

const userModel = mongoose.model<User>("user", userSchema);

export default userModel;
