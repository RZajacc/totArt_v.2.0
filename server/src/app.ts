import express from "express";
import colors from "colors";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import passport from "passport";

import locationsRoutes from "./routes/locationsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";

import cloudinaryConfig from "./config/cloudinaryConfig.js";
import passportConfig from "./config/passport.js";

dotenv.config();

// * CREATE APP
const app = express();

// * 1_DB CONNECTION
const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB as string);
    console.log("Connection to MONGODB established".bgGreen);
  } catch (error) {
    console.log("Connection to MONGODB failed".bgRed);
  }
};

// * 2_APP MIDDLEWARES
const addMiddlewares = () => {
  app.use(express.json());
  app.use(cors());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  cloudinaryConfig();
  passport.initialize();
  passportConfig(passport);
};

// * 3_ADD ROUTES
const addRoutes = () => {
  app.use("/api/locations", locationsRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/comments", commentRoutes);
  app.use("/api/images", imageRoutes);
  app.use("/api/email", emailRoutes);
};

// * 4_START SERVER
const startServer = () => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(colors.magenta.italic("Server running on port :"), port);
  });
};

(async function controller() {
  await DBConnection();
  addMiddlewares();
  addRoutes();
  startServer();
})();
