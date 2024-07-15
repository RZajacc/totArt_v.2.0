import express from "express";
import {
  register,
  login,
  getProfle,
  handleFavouriteLocations,
  deleteUser,
  getAllFavs,
  getAllUserPosts,
  updateUserData,
} from "../controller/userController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

// Set up a express router
const router = express.Router();

router.get("/profile", jwtAuth, getProfle);

router.post("/login", login);
router.post("/register", register);

router.patch("/handleFavouriteLocations", handleFavouriteLocations);
router.patch("/updateUser", updateUserData);

// !To be checked
router.post("/allUserPosts", getAllUserPosts);
router.post("/allUserFavs", getAllFavs);
router.post("/deleteUser", deleteUser);

export default router;
