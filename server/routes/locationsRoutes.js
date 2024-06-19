import express from "express";
import {
  getAllLocations,
  getLocationDetails,
  addNewLocation,
  updatePost,
} from "../controller/locationsController.js";

const router = express.Router();

router.get("/all", getAllLocations);
router.post("/details", getLocationDetails);
router.post("/addNewLocation", addNewLocation);
router.post("/updatePost", updatePost);

export default router;
