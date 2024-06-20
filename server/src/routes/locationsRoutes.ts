import { Router } from "express";
import {
  getAllLocations,
  getLocationDetails,
  addNewLocation,
} from "../controller/locationsController.js";

const router = Router();

router.get("/all", getAllLocations);
router.post("/details", getLocationDetails);
router.post("/addNewLocation", addNewLocation);
// router.post("/updatePost", updatePost);

export default router;
