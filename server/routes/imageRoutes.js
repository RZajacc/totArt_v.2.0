import express from "express";

const router = express.Router();

router.post("/imageUpload", multerUpload.single("userImage"), uploadImage);
router.post("/imageDelete", deleteImage);

export default router;
