import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "_" + uniqueSuffix);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  // * FILE EXTENSION
  const extension = path.extname(file.originalname);

  if (extension !== ".png" && extension !== ".jpg" && extension !== "jpeg") {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const multerUpload = multer({ storage, fileFilter });

export default multerUpload;
