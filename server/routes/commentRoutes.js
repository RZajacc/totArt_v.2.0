import express from "express";
import {
  addNewComment,
  deleteComment,
  editComment,
} from "../controller/commentsController.js";

const router = express.Router();

router.post("/addComment", addNewComment);
router.patch("/editComment", editComment);
router.delete("/deleteComment", deleteComment);

export default router;
