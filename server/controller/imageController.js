import { v2 as cloudinary } from "cloudinary";
import imageModel from "../models/imageModel.js";
import postModel from "../models/postModel.js";

// Upload image to cloudinary
const locationImageUpload = async (req, res) => {
  // Cloudinary options
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: req.body.folder,
  };

  if (req.file) {
    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(req.file.path, options);
      // Remove unused variables from returned value
      delete result[("api_key", "tags")];
      // Create image object
      const image = new imageModel({
        ...result,
        related_location: req.body.related_location,
      });
      // Save the image in the database
      const savedImage = await image.save();
      // Update location with a newly saved image
      const location = await postModel.findByIdAndUpdate(
        req.body.related_location,
        {
          image: savedImage._id,
        }
      );

      // Return the result of all operations
      res.status(200).json({
        msg: "Image uploaded successfully",
        imageUrl: savedImage.secure_url,
        updatedLocation: location.title,
      });
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
    const result = await cloudinary.uploader.destroy(req.body.publicId);
    if (result) {
      res.status(200).json({
        message: "Image deleted successfully",
        userImage: result,
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

export { locationImageUpload, deleteImage };
