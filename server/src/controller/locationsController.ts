import { RequestHandler } from "express";
import imageModel from "../models/imageModel.js";
import locationModel from "../models/locationModel.js";
import userModel from "../models/userModel.js";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import {
  Location,
  PopulatedLocation,
  PopulatedLocationDetails,
} from "../types/LocationTypes.js";
import { HydratedDocument, Types } from "mongoose";
import { User } from "../types/UserTypes.js";
import { Image } from "../types/ImageTypes.js";
import { error } from "console";

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
      msg: error,
    });
  }
};

const getLocationDetails: RequestHandler = async (req, res) => {
  // Defining incoming data
  const inputs: { _id: string } = req.body;

  // Defining object ID
  const locationId = new Types.ObjectId(inputs._id);

  try {
    // Check if post exists
    const locationData: HydratedDocument<PopulatedLocationDetails> | null =
      await locationModel
        .findById(locationId)
        .populate({
          path: "author",
          select: ["userName", "userImage"],
        })
        .populate({ path: "image" })
        .populate({
          path: "comments",
          populate: {
            path: "author",
            select: ["userName", "userImage"],
            populate: "userImage",
          },
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
      msg: error,
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

const updateLocation: RequestHandler = async (req, res) => {
  // Define incoming data
  const inputs: {
    locationId: string;
    propertyName: string;
    updatedValue: string;
  } = req.body;

  // Convert locationId into id type
  const locationId = new Types.ObjectId(inputs.locationId);

  // Find and update location data
  try {
    let updatedLocation: HydratedDocument<Location> | null =
      await locationModel.findByIdAndUpdate(
        locationId,
        {
          [`${inputs.propertyName}`]: inputs.updatedValue,
        },
        {
          new: true,
        }
      );
    if (updatedLocation) {
      res.status(200).json({
        msg: `Locations ${inputs.propertyName} successfully updated`,
      });
    } else {
      res.status(404).json({
        msg: "Could not find requested location!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Unknown server error",
    });
  }
};

const deleteLocation: RequestHandler = async (req, res) => {
  // Define incoming data
  const inputs: { imageId: string; imagePublicId: string; locationId: string } =
    req.body;
  // Convert string to object id
  const imageId = new Types.ObjectId(inputs.imageId);
  const locationId = new Types.ObjectId(inputs.locationId);

  try {
    // Delete image both in db and remove from cloudinary
    const cloudinaryImage: { result: string } =
      await cloudinary.uploader.destroy(inputs.imagePublicId);

    // Delete image instance from the db
    const dbImage: HydratedDocument<Image> | null =
      await imageModel.findByIdAndDelete(imageId);

    // Delete location
    const deletedLocation: HydratedDocument<Location> | null =
      await locationModel.findByIdAndDelete(locationId);

    // Remove locations id from author
    if (deletedLocation) {
      const locationAuthor = await userModel.findByIdAndUpdate(
        deletedLocation.author._id,
        { $pull: { posts: deletedLocation.id } }
      );
      res.status(200).json({
        msg: "Location deleted successfully",
        cloudinaryResponse: cloudinaryImage.result,
        deletedImageId: dbImage?.id,
        locationTitle: deletedLocation.title,
        locationAuthor: locationAuthor?.userName,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Unknown server error",
    });
  }
};

export {
  getAllLocations,
  getLocationDetails,
  addNewLocation,
  updateLocation,
  deleteLocation,
};
