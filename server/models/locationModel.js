import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
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

const locationModel = mongoose.model("location", postSchema);

export default locationModel;