import express from "express";
import multerUpload from "../middlewares/multer.js";
import { deleteImage, uploadImage } from "../controller/imageController.js";

const router = express.Router();

router.post("/imageUpload", multerUpload.single("userImage"), uploadImage);
router.delete("/imageDelete", deleteImage);

export default router;
