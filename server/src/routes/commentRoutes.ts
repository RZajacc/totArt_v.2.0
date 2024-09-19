import express from "express";
import {
  addNewComment,
  deleteComment,
  editComment,
  getComments,
} from "../controller/commentsController.js";

const router = express.Router();

router.get("/getComments", getComments);
router.post("/addComment", addNewComment);
router.patch("/editComment", editComment);
router.delete("/deleteComment", deleteComment);

export default router;
