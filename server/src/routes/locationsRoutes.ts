import { Router } from "express";
import {
  getAllLocations,
  getLocationDetails,
  addNewLocation,
  updateLocation,
  deleteLocation,
} from "../controller/locationsController.js";

const router = Router();

router.get("/all", getAllLocations);
router.post("/details", getLocationDetails);
router.post("/addNewLocation", addNewLocation);
router.patch("/updateLocation", updateLocation);
router.delete("/deleteLocation", deleteLocation);

export default router;
