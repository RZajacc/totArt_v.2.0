import { Router } from "express";
import {
  getAllLocations,
  getLocationDetails,
  addNewLocation,
  updateLocation,
} from "../controller/locationsController.js";

const router = Router();

router.get("/all", getAllLocations);
router.post("/details", getLocationDetails);
router.post("/addNewLocation", addNewLocation);
router.patch("/updateLocation", updateLocation);

export default router;
