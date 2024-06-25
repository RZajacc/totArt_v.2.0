import mongoose from "mongoose";
import { Image } from "../types/ImageTypes";

const imageSchema = new mongoose.Schema<Image>({
  asset_id: { type: String, required: true },
  public_id: { type: String, required: true },
  version: { type: Number, required: true },
  version_id: { type: String, required: true },
  signature: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  format: { type: String, required: true },
  resource_type: { type: String, required: true },
  created_at: { type: String, required: true },
  bytes: { type: Number, required: true },
  type: { type: String, required: true },
  etag: { type: String, required: true },
  placeholder: { type: Boolean, required: true },
  url: { type: String, required: true },
  secure_url: { type: String, required: true },
  folder: { type: String, required: true },
  original_filename: { type: String, required: true },
  related_user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  related_location: { type: mongoose.Schema.Types.ObjectId, ref: "location" },
});

const imageModel = mongoose.model<Image>("image", imageSchema);

export default imageModel;
