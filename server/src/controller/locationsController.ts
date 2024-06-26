import { RequestHandler } from "express";
import imageModel from "../models/imageModel.js";
import locationModel from "../models/locationModel.js";
import userModel from "../models/userModel.js";
import {
  Location,
  PopulatedLocation,
  PopulatedLocationDetails,
} from "../types/LocationTypes.js";
import { HydratedDocument, Types } from "mongoose";
import { User } from "../types/UserTypes.js";
import { Image } from "../types/ImageTypes.js";

const getAllLocations: RequestHandler = async (req, res) => {
  try {
    const allLocations: PopulatedLocation[] | undefined = await locationModel
      .find()
      .populate({ path: "author", select: ["userName"] })
      .populate({ path: "image" });

    if (allLocations) {
      res.status(200).json({
        number: allLocations.length,
        locations: allLocations,
      });
    } else {
      res.status(404).json({
        msg: "Location not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
    });
  }
};

const getLocationDetails: RequestHandler = async (req, res) => {
  // Defining incoming data
  const inputs: { id: string } = req.body;
  // Defining object ID
  const locationId = new Types.ObjectId(inputs.id);

  try {
    // Check if post exists
    const locationData: HydratedDocument<PopulatedLocationDetails> | null =
      await locationModel
        .findById(locationId)
        .populate({ path: "author", select: ["userName", "userImage"] })
        .populate({ path: "image" })
        .populate({
          path: "comments",
          populate: { path: "author", select: ["userName", "userImage"] },
        });

    // If it doesnt return a message
    if (!locationData) {
      res.status(400).json({
        msg: "Requested location does not exist",
      });
    } else {
      // If it does return data
      res.status(200).json(locationData);
    }
  } catch {
    res.status(500).json({
      msg: "Server error",
    });
  }
};

const addNewLocation: RequestHandler = async (req, res) => {
  // Defining incoming data
  const inputs: {
    title: string;
    description: string;
    location: string;
    image: string;
    author: string;
  } = req.body;

  // Converting strings to object IDS
  const imageId = new Types.ObjectId(inputs.image);
  const authorId = new Types.ObjectId(inputs.author);

  // Create a new post
  const newLocationModel: HydratedDocument<Location> = new locationModel({
    title: inputs.title,
    description: inputs.description,
    location: inputs.location,
    image: imageId,
    author: authorId,
  });

  try {
    // Save new location
    const newLocation: HydratedDocument<Location> =
      await newLocationModel.save();

    // Update user with a new location id
    const author: HydratedDocument<User> | null =
      await userModel.findByIdAndUpdate(authorId, {
        $push: { posts: newLocation.id },
      });

    // Update image with a new locationid
    const relatedImage: HydratedDocument<Image> | null =
      await imageModel.findByIdAndUpdate(
        imageId,
        {
          related_location: newLocation.id,
        },
        { new: true }
      );

    // If both objects are updated properly return a response
    if (author && relatedImage) {
      res.status(201).json({
        msg: "new post uploaded uploaded",
        locationId: newLocation._id,
        author: author.id,
        relatedImageId: relatedImage.id,
      });
    } else {
      res.status(400).json({
        msg: "Updating related documents failed",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// ! Naming and functionality to change
const updateLocation: RequestHandler = async (req, res) => {
  // const filter = { _id: req.body._id };
  // const elementName = req.body.elementName;
  // const elementValue = req.body.elementValue;
  // const update = { [`${elementName}`]: elementValue };
  // // * This section covers connecting user with his posts
  // if (req.body.elementName === "comments") {
  //   let updatedPost = await locationModel.findOneAndUpdate(
  //     filter,
  //     { $push: { comments: elementValue } },
  //     {
  //       new: true,
  //     }
  //   );
  //   res.status(200).json({
  //     msg: "Posts updated properly",
  //   });
  // }
};

export { getAllLocations, getLocationDetails, addNewLocation, updateLocation };
