import { HydratedDocument, ObjectId, Schema, Types } from "mongoose";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import { bcrypt_hash, bcrypt_verifyPassword } from "../utils/bcrypt_config.js";
import { generateToken } from "../utils/tokenServices.js";
import { RequestHandler } from "express";
import { PopulatedUser, User } from "../types/UserTypes.js";
import { Image } from "../types/ImageTypes.js";
import imageModel from "../models/imageModel.js";
import locationModel from "../models/locationModel.js";
import commentModel from "../models/commentModel.js";

const register: RequestHandler = async (req, res) => {
  // Define incoming data
  const inputs: { userName: string; email: string; password: string } =
    req.body;
  try {
    const hashedPassword = await bcrypt_hash(inputs.password);
    if (hashedPassword) {
      // Check if a new user exists already
      const existingUser: HydratedDocument<User> | null =
        await userModel.findOne({ email: inputs.email });
      // If user exists then return an error
      if (existingUser) {
        res.status(400).json({
          msg: "Email already exists in the database!",
        });
      } else {
        // Create a user model
        const newUser: HydratedDocument<User> = new userModel({
          userName: inputs.userName,
          email: inputs.email,
          password: hashedPassword,
        });
        // Save new user into database
        try {
          const savedUser: HydratedDocument<User> = await newUser.save();
          res.status(201).json({
            msg: `Registration successfull!`,
            user: {
              userName: savedUser.userName,
              email: savedUser.email,
            },
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            msg: "Something went wrong with creating a user!",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong with hashing password!",
    });
  }
};

const login: RequestHandler = async (req, res) => {
  // Define incoming data
  const inputs: { email: string; password: string } = req.body;
  // Check if the user exists in the database
  try {
    const existingUser: HydratedDocument<User> | null = await userModel.findOne(
      { email: inputs.email }
    );
    if (!existingUser) {
      res.status(404).json({
        msg: "No user found with provided email!",
      });
    } else {
      // Check password
      const checkPassword = await bcrypt_verifyPassword(
        req.body.password,
        existingUser.password
      );

      if (!checkPassword) {
        res.status(404).json({
          msg: "Wrong password, try again!",
        });
      }

      if (checkPassword) {
        // GENERATE TOKEN
        const token = generateToken(existingUser.id);
        if (token) {
          res.cookie("auth-token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV !== "development",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
          });
          res.status(201).json({
            msg: "Login sucessfull",
            token,
          });
        } else {
          console.log("error generating a token");
          res.status(400).json({
            msg: "Something went wrong with your request",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: "I don't have a clue whats wrong!",
    });
  }
};

const logout: RequestHandler = async (req, res) => {
  res.clearCookie("auth-token", {
    httpOnly: true,
    sameSite: "lax", // Ensure same site behavior
    //  secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
  });
  res.status(200).json({ msg: "Logout successfull" });
};

const getProfle: RequestHandler = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      _id: req.user.id,
      userName: req.user.userName,
      email: req.user.email,
      userImage: req.user.userImage,
      userWebsite: req.user.userWebsite,
      userBio: req.user.userBio,
      comments: req.user.comments,
      posts: req.user.posts,
      favs: req.user.favs,
    });
  }

  if (!req.user) {
    res.status(401).json({
      msg: "You need to authorize first!",
    });
  }
};

const handleFavouriteLocations: RequestHandler = async (req, res) => {
  // Define incoming data
  const inputs: { email: string; favId: string } = req.body;

  // Convert incoming string to id
  const favId = new Types.ObjectId(inputs.favId);

  // Filter to find a user in the database
  const filter = { email: inputs.email };

  try {
    // Check if user exists in DB
    const userToUpdate: HydratedDocument<User> | null = await userModel.findOne(
      filter
    );

    // If user exists check if he has location saved already
    let hasFav = userToUpdate ? userToUpdate.favs.includes(favId) : undefined;

    // If user exists and doesnt have location in fav
    if (userToUpdate && !hasFav) {
      const updatedUser: HydratedDocument<User> | null =
        await userModel.findOneAndUpdate(
          filter,
          { $push: { favs: favId } },
          {
            new: true,
          }
        );
      if (updatedUser) {
        res.status(201).json({
          msg: "Location added to favourites",
          userFavs: updatedUser.favs,
        });
      }
      // If user exists and have location in fav
    } else if (userToUpdate && hasFav) {
      const updatedUser: HydratedDocument<User> | null =
        await userModel.findOneAndUpdate(
          filter,
          { $pull: { favs: favId } },
          {
            new: true,
          }
        );
      if (updatedUser) {
        res.status(201).json({
          msg: "Location removed from favourites",
          userFavs: updatedUser.favs,
        });
      }
      // User is not found
    } else {
      res.status(404).json({
        msg: `Usermail ${inputs.email}, was not found in the database!`,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
    });
  }
};

const updateUserData: RequestHandler = async (req, res) => {
  // Define inputs
  const inputs: { email: string; elementName: string; elementValue: string } =
    req.body;

  const availableUpdates = ["userName", "userWebsite", "userBio", "userImage"];

  // Check if provided prop is on the list to update
  if (availableUpdates.includes(inputs.elementName)) {
    // Filter and update selectors
    const filter = { email: inputs.email };

    // Add conditional type conversion if userImage is being updated
    const update = {
      [`${inputs.elementName}`]:
        inputs.elementName === "userImage"
          ? new Types.ObjectId(inputs.elementValue)
          : inputs.elementValue,
    };

    // Update a user
    try {
      let updatedUser = await userModel.findOneAndUpdate(filter, update, {
        new: true,
      });

      // If user was found return a message
      if (updatedUser) {
        res.status(200).json({
          msg: `${inputs.elementName} field updated successfully to a new value - ${inputs.elementValue}`,
        });
      } else {
        res.status(400).json({
          msg: "User could not be found or updated",
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Unknown server error",
      });
    }
  } else {
    res.status(404).json({
      msg: `Property you are trying to update does not exist in the database. Properties available to update are the following: ${availableUpdates}`,
    });
  }
};

const verifyPassword: RequestHandler = async (req, res) => {
  // Define incoming data
  const inputs: { email: string; password: string } = req.body;

  try {
    // Check if the user exists in the database
    const existingUser: HydratedDocument<User> | null = await userModel.findOne(
      {
        email: inputs.email,
      }
    );

    // If user doesn't exist return a message
    if (!existingUser) {
      res.status(404).json({
        msg: "No user found with provided email!",
      });
    }

    // Check if provided password matched the one stored in the DB
    const checkPassword = await bcrypt_verifyPassword(
      req.body.password,
      existingUser ? existingUser.password : ""
    );

    // If yes return true, if not false
    if (checkPassword) {
      res.status(200).json({
        passwordValid: checkPassword,
      });
    } else {
      res.status(200).json({
        passwordValid: checkPassword,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

const updateUserPassword: RequestHandler = async (req, res) => {
  // Define incoming data
  const inputs: { email: string; password: string } = req.body;

  try {
    const hashedPassword = await bcrypt_hash(inputs.password);
    // If hashing was succesfull, update the user
    if (hashedPassword) {
      const updatedUser: HydratedDocument<User> | null =
        await userModel.findOneAndUpdate(
          { email: inputs.email },
          { password: hashedPassword },
          { new: true }
        );

      // Check if updating the user was successfull
      if (updatedUser) {
        res.status(200).json({
          msg: "Password updated successfully!",
        });
      } else {
        res.status(400).json({
          msg: "Error while updating the user",
        });
      }
    } else {
      res.status(400).json({
        msg: "Error while hashing the password",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

const deleteUser: RequestHandler = async (req, res) => {
  // Define incoming inputs
  const inputs: { _id: string } = req.body;

  // Parse incoming id into id type
  const userId = new Types.ObjectId(inputs._id);

  // Find user and populate all fields that needs to be cleared including images
  const userToDelete: HydratedDocument<PopulatedUser> | null = await userModel
    .findById(userId)
    .populate({ path: "userImage", select: ["public_id"] })
    .populate({
      path: "posts",
      select: ["image"],
      populate: { path: "image", select: ["public_id"] },
    });

  // If user has own image remove it from cloudinary and DB
  if (userToDelete && userToDelete.userImage) {
    const dbImage: HydratedDocument<Image> | null =
      await imageModel.findByIdAndDelete(
        userToDelete.userImage ? userToDelete.userImage._id : ""
      );
    const cloudinaryImage: { result: string } =
      await cloudinary.uploader.destroy(
        userToDelete.userImage ? userToDelete.userImage.public_id : ""
      );
  }

  // If user added locations then delete their images and location itself
  if (userToDelete && userToDelete.posts.length > 0) {
    userToDelete.posts.forEach(async (post) => {
      const dbImage: HydratedDocument<Image> | null =
        await imageModel.findByIdAndDelete(post.image._id);
      const cloudinaryImage: { result: string } =
        await cloudinary.uploader.destroy(post.image.public_id);
      let postToDelete = await locationModel.findByIdAndDelete(post._id);
    });
  }

  // If user added some comments remove all of them
  if (userToDelete && userToDelete.comments.length > 0) {
    userToDelete.comments.forEach(async (comment) => {
      let commentToDelete = await commentModel.findByIdAndDelete(comment);
    });
  }

  // And finally delete user itself
  if (userToDelete) {
    let deletedUser: HydratedDocument<PopulatedUser> | null =
      await userModel.findByIdAndDelete(userId);

    if (deletedUser) {
      res.status(200).json({ msg: "User deleted successfully" });
    } else {
      res.status(400).json({ msg: "Deleting user failed" });
    }
  } else {
    res.status(404).json({ msg: "User not found" });
  }
};

export {
  register,
  login,
  logout,
  getProfle,
  handleFavouriteLocations,
  updateUserData,
  verifyPassword,
  updateUserPassword,
  deleteUser,
};
