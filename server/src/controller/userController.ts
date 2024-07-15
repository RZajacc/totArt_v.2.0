import { HydratedDocument, Types } from "mongoose";
import userModel from "../models/userModel.js";
import { bcrypt_hash, bcrypt_verifyPassword } from "../utils/bcrypt_config.js";
import { generateToken } from "../utils/tokenServices.js";
import { RequestHandler } from "express";
import { User } from "../types/UserTypes.js";

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

// ! Methods from here on needs check and possibly refinement
const updateUserData: RequestHandler = async (req, res) => {
  // Define inputs
  const inputs: { email: string; elementName: string; elementValue: string } =
    req.body;

  // const filter = { email: req.body.email };
  // const update = { [`${elementName}`]: elementValue };
  // // * This section covers connecting user with his posts
  // if (req.body.elementName === "posts") {
  //   let updatedUser = await userModel.findOneAndUpdate(
  //     filter,
  //     { $push: { posts: req.body.elementValue } },
  //     {
  //       new: true,
  //     }
  //   );
  //   res.status(200).json({
  //     msg: "Posts populated properly",
  //   });
  // } else if (req.body.elementName === "favs") {
  //   let updatedUser = await userModel.findOneAndUpdate(
  //     filter,
  //     { $push: { favs: req.body.elementValue } },
  //     {
  //       new: true,
  //     }
  //   );
  //   res.status(200).json({
  //     msg: "Favs populated properly",
  //   });
  // } else if (req.body.elementName === "userComment") {
  //   let updatedUser = await userModel.findOneAndUpdate(
  //     filter,
  //     { $push: { comments: req.body.elementValue } },
  //     {
  //       new: true,
  //     }
  //   );
  //   res.status(200).json({
  //     msg: "Favs populated properly",
  //   });
  // } else {
  //   // * Or just continue with updateing other user fields
  //   let updatedUser = await userModel.findOneAndUpdate(filter, update, {
  //     new: true,
  //   });
  //   res.status(200).json({
  //     msg: "User updated successfully",
  //   });
  // }
};

const getAllUserPosts: RequestHandler = async (req, res) => {
  // const userPosts = await userModel
  //   .findOne({ email: req.body.email })
  //   .populate({
  //     path: "posts",
  //     select: ["title", "description", "location", "imageUrl"],
  //   })
  //   .exec();
  // res.status(200).json({
  //   msg: "Posts field populated successfully",
  //   posts: userPosts.posts,
  // });
};

const getAllFavs: RequestHandler = async (req, res) => {
  // const userFavs = await userModel
  //   .findOne({ email: req.body.email })
  //   .populate({ path: "favs", select: ["_id", "title"] })
  //   .exec();
  // res.status(200).json({
  //   msg: "Populate worked",
  //   favs: userFavs.favs,
  // });
};

const deleteUser: RequestHandler = async (req, res) => {
  // const userToDelete = await userModel.findById(req.body._id);
  // // console.log(userToDelete);
  // userToDelete.posts.forEach(async (post) => {
  //   let postToDelete = await locationModel.findByIdAndDelete(post);
  // });
  // userToDelete.comments.forEach(async (comment) => {
  //   let commentToDelete = await commentModel.findByIdAndDelete(comment);
  // });
  // let deleteUser = await userModel.findByIdAndDelete(req.body._id);
  // res.json({ msg: "user deleted successfully" });
};

export {
  register,
  login,
  getProfle,
  handleFavouriteLocations,
  updateUserData,
  getAllUserPosts,
  getAllFavs,
  deleteUser,
};
