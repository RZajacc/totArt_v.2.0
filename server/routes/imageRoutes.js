import express from "express";
import multerUpload from "../middlewares/multer.js";
import {
  deleteImage,
  locationImageUpload,
} from "../controller/imageController.js";

const router = express.Router();

router.post(
  "/locationImageUpload",
  multerUpload.single("userImage"),
  locationImageUpload
);
router.delete("/imageDelete", deleteImage);

export default router;
