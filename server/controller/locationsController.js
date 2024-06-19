import locationModel from "../models/locationModel.js";
import userModel from "../models/userModel.js";

const getAllLocations = async (req, res) => {
  try {
    const allLocations = await locationModel
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

const getLocationDetails = async (req, res) => {
  try {
    // Check if post exists
    const locationData = await locationModel
      .findById(req.body.id)
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
      res.status(200).json({
        locationData,
      });
    }
  } catch {
    res.status(500).json({
      msg: "Server error",
    });
  }
};

const addNewLocation = async (req, res) => {
  // Create a new post
  const newLocationModel = new locationModel({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    image: req.body.image,
    author: req.body.author,
  });

  try {
    const newLocation = await newLocationModel.save();
    const author = await userModel.findByIdAndUpdate(req.body.author, {
      $push: { posts: newLocation.id },
    });
    res.status(201).json({
      msg: "new post uploaded uploaded",
      postId: newLocation._id,
      author: author.id,
    });
  } catch (error) {
    console.log(error);
  }
};

// ! Naming and functionality to change
const updatePost = async (req, res) => {
  const filter = { _id: req.body._id };
  const elementName = req.body.elementName;
  const elementValue = req.body.elementValue;
  const update = { [`${elementName}`]: elementValue };

  // * This section covers connecting user with his posts
  if (req.body.elementName === "comments") {
    let updatedPost = await locationModel.findOneAndUpdate(
      filter,
      { $push: { comments: elementValue } },
      {
        new: true,
      }
    );
    res.status(200).json({
      msg: "Posts updated properly",
    });
  }
};

export { getAllLocations, getLocationDetails, addNewLocation, updatePost };
