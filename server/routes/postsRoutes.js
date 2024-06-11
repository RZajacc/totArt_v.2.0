import express from "express";
import {
  getAllLocations,
  getLocationDetails,
  addNewPost,
  updatePost,
} from "../controller/postController.js";

const router = express.Router();

router.get("/all", getAllLocations);
router.post("/details", getLocationDetails);
router.post("/addNewPost", addNewPost);
router.post("/updatePost", updatePost);

export default router;
