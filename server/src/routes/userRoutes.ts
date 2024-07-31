import express from "express";
import {
  register,
  login,
  getProfle,
  handleFavouriteLocations,
  deleteUser,
  updateUserData,
  verifyPassword,
  updateUserPassword,
} from "../controller/userController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

// Set up a express router
const router = express.Router();

router.get("/profile", jwtAuth, getProfle);

router.post("/login", login);
router.post("/register", register);
router.post("/verifyUserPassword", verifyPassword);
router.post("/updateUserPassword", updateUserPassword);

router.patch("/handleFavouriteLocations", handleFavouriteLocations);
router.patch("/updateUser", updateUserData);

// !To be checked
router.delete("/deleteUser", deleteUser);

export default router;
