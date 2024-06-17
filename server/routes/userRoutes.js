import express from "express";
import {
  register,
  login,
  getProfle,
  handleFavouriteLocations,
  deleteFromUserArray,
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

router.post("/updateUser", updateUserData);
router.post("/allUserPosts", getAllUserPosts);
router.post("/allUserFavs", getAllFavs);
router.post("/deleteFromUserArray", deleteFromUserArray);
router.post("/deleteUser", deleteUser);

export default router;
