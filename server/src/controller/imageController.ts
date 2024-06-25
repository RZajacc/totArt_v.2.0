import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import imageModel from "../models/imageModel.js";
import locationModel from "../models/locationModel.js";
import { RequestHandler } from "express";
import { CloudinaryImage } from "../types/ImageTypes.js";

// Upload image to cloudinary
const ImageUpload: RequestHandler = async (req, res) => {
  // Collecting inputs
  const input: { folder: string } = req.body;
  const uploadedImage: Express.Multer.File | undefined = req.file;

  // Cloudinary options
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: input.folder,
  };

  if (uploadedImage) {
    try {
      // Upload the image
      const result: UploadApiResponse = await cloudinary.uploader.upload(
        uploadedImage.path,
        options
      );

      // Define valid keys for unnecessary properties to remove from the upload response
      const api_keyProp: keyof UploadApiResponse = "api_key";
      const tags_keyProp: keyof UploadApiResponse = "tags";

      // Delete properties
      delete result[api_keyProp];
      delete result[tags_keyProp];

      // Create image object
      const image = new imageModel(result);
      // Save the image in the database
      const savedImage = await image.save();
      // Return the result of all operations
      res.status(200).json(savedImage);
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(500).json({
      msg: "File type not supported or file not selected!",
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    // Delete image instance from cloudinary
    const cloudinaryImage = await cloudinary.uploader.destroy(
      req.body.publicId
    );
    // Delete image instance from the db
    const dbImage = await imageModel.findByIdAndDelete(req.body.imageId);

    if (cloudinaryImage && dbImage) {
      res.status(200).json({
        message: "Image deleted from cloudinary and database",
        cloudinary_publicId: req.body.publicId,
        cloudinaryStatus: cloudinaryImage.result,
        db_status: "Image deleted",
        db_publicId: dbImage.public_id,
      });
    } else {
      res.status(404).json({
        msg: "Image not found!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Server error",
    });
  }
};

export { ImageUpload, deleteImage };
