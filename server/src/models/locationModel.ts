import mongoose from "mongoose";
import { Location } from "../types/LocationTypes";

const locationSchema = new mongoose.Schema<Location>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: { type: mongoose.Schema.Types.ObjectId, ref: "image" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  favs: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

const locationModel = mongoose.model<Location>("location", locationSchema);

export default locationModel;
