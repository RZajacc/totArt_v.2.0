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
        userImage: {
          asset_id: result.asset_id,
          public_id: result.public_id,
          version: result.version,
          version_id: result.version_id,
          signature: result.signature,
          width: result.width,
          height: result.height,
          format: result.format,
          resource_type: result.resource_type,
          created_at: result.created_at,
          bytes: result.bytes,
          type: result.type,
          etag: result.etag,
          placeholder: result.placeholder,
          url: result.url,
          secure_url: result.secure_url,
          folder: result.folder,
          original_filename: result.original_filename,
        },
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
