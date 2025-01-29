import { Router } from "express";
import {
  register,
  login,
  getProfile,
  handleFavouriteLocations,
  deleteUser,
  updateUserData,
  verifyPassword,
  updateUserPassword,
} from "../controller/userController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

// Set up a express router
const router = Router();

router.get("/profile", jwtAuth, getProfile);
router.post("/login", login);
router.post("/register", register);
router.post("/verifyUserPassword", verifyPassword);
router.post("/updateUserPassword", updateUserPassword);
router.patch("/handleFavouriteLocations", handleFavouriteLocations);
router.patch("/updateUser", updateUserData);
router.delete("/deleteUser", deleteUser);

export default router;
