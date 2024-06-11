import postModel from "../models/postModel.js";

const getAllLocations = async (req, res) => {
  try {
    const allPosts = await postModel
      .find()
      .populate({ path: "author", select: ["userName"] });

    if (allPosts) {
      res.status(200).json({
        number: allPosts.length,
        posts: allPosts,
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
    const postData = await postModel
      .findById(req.body.id)
      .populate({ path: "author", select: ["userName", "userImage"] })
      .populate({
        path: "comments",
        populate: { path: "author", select: ["userName", "userImage"] },
      });

    // If it doesnt return a message
    if (!postData) {
      res.status(400).json({
        msg: "Requested location does not exist",
      });
    } else {
      // If it does return data
      res.status(200).json({
        _id: postData._id,
        title: postData.title,
        description: postData.description,
        location: postData.location,
        imageUrl: postData.imageUrl,
        author: postData.author,
        favs: postData.favs,
        comments: postData.comments,
      });
    }
  } catch {
    res.status(500).json({
      msg: "Server error",
    });
  }
};

const addNewPost = async (req, res) => {
  console.log(req.body);
  const newPost = new postModel({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    imageUrl: req.body.imageUrl,
    author: req.body.author,
  });

  try {
    const savedPost = newPost.save();
    res.status(201).json({
      msg: "new post uploaded uploaded",
      postId: newPost._id,
    });
  } catch (error) {}
};

// ! Naming to change
const updatePost = async (req, res) => {
  const filter = { _id: req.body._id };
  const elementName = req.body.elementName;
  const elementValue = req.body.elementValue;
  const update = { [`${elementName}`]: elementValue };

  // * This section covers connecting user with his posts
  if (req.body.elementName === "comments") {
    let updatedPost = await postModel.findOneAndUpdate(
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

export { getAllLocations, addNewPost, getLocationDetails, updatePost };
