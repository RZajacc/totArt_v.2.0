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
  logout,
} from "../controller/userController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

// Set up a express router
const router = express.Router();

router.get("/profile", jwtAuth, getProfle);
router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.post("/verifyUserPassword", verifyPassword);
router.post("/updateUserPassword", updateUserPassword);
router.patch("/handleFavouriteLocations", handleFavouriteLocations);
router.patch("/updateUser", updateUserData);
router.delete("/deleteUser", deleteUser);

export default router;
