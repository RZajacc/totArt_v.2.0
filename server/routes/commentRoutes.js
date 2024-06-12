import express from "express";
import {
  addNewComment,
  deleteComment,
} from "../controller/commentsController.js";

const router = express.Router();

router.post("/addComment", addNewComment);
router.delete("/deleteComment", deleteComment);

export default router;
