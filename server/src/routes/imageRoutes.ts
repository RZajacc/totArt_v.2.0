import express from "express";
import multerUpload from "../middlewares/multer.js";
import { deleteImage, ImageUpload } from "../controller/imageController.js";

const router = express.Router();

router.post("/ImageUpload", multerUpload.single("userImage"), ImageUpload);
router.delete("/imageDelete", deleteImage);

export default router;
