import express from "express";
import {
  register,
  login,
  getProfle,
  handleFavouriteLocations,
  deleteFromUserArray,
  deleteImage,
  deleteUser,
  getAllFavs,
  getAllUserPosts,
  updateUserData,
  uploadImage,
} from "../controller/userController.js";
import multerUpload from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get("/profile", jwtAuth, getProfle);

router.post("/login", login);
router.post("/register", register);

router.patch("/handleFavouriteLocations", handleFavouriteLocations);

router.post("/imageUpload", multerUpload.single("userImage"), uploadImage);
router.post("/imageDelete", deleteImage);
router.post("/updateUser", updateUserData);
router.post("/allUserPosts", getAllUserPosts);
router.post("/allUserFavs", getAllFavs);
router.post("/deleteFromUserArray", deleteFromUserArray);
router.post("/deleteUser", deleteUser);

export default router;
