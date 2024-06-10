import express from "express";
import {
  addToUserFavourites,
  deleteFromUserArray,
  deleteImage,
  deleteUser,
  getAllFavs,
  getAllUserPosts,
  getProfle,
  login,
  register,
  updateUserData,
  uploadImage,
} from "../controller/userController.js";
import multerUpload from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get("/profile", jwtAuth, getProfle);

// Login has post since Im creating a token as a result
router.post("/login", login);
router.post("/register", register);

router.patch("/addToUserFavourites", addToUserFavourites);

router.post("/imageUpload", multerUpload.single("userImage"), uploadImage);
router.post("/imageDelete", deleteImage);
router.post("/updateUser", updateUserData);
router.post("/allUserPosts", getAllUserPosts);
router.post("/allUserFavs", getAllFavs);
router.post("/deleteFromUserArray", deleteFromUserArray);
router.post("/deleteUser", deleteUser);

export default router;
