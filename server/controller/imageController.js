import { v2 as cloudinary } from "cloudinary";

// Upload image to cloudinary
const uploadImage = async (req, res) => {
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
      console.log(result);
      res.status(200).json({
        message: "Image uploaded successfully",
        userImage: result,
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(500).json({
      error: "File type not supported or file not selected",
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.body.publicId);
    console.log(result);
    res.status(200).json({
      message: "Image deleted successfully",
      userImage: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export { uploadImage, deleteImage };
