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
import sgMail from "@sendgrid/mail";

dotenv.config();

// CREATE APP
const app = express();

// 1_DB CONNECTION
const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB as string);
    console.log("Connection to MONGODB established".bgGreen);
  } catch (error) {
    console.log("Connection to MONGODB failed".bgRed);
  }
};

// 2_Authorize sendgrid API
const Sendgrid_API = () => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
};

// 3_APP MIDDLEWARES
const addMiddlewares = () => {
  app.use(express.json());
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  cloudinaryConfig();
  passport.initialize();
  passportConfig(passport);
};

// 4_ADD ROUTES
const addRoutes = () => {
  app.use("/api/locations", locationsRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/comments", commentRoutes);
  app.use("/api/images", imageRoutes);
  app.use("/api/email", emailRoutes);
};

// 5_START SERVER
const startServer = () => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(colors.magenta.italic("Server running on port :"), port);
  });
};

// 6_INITIATE THE APP
(async function controller() {
  await DBConnection();
  Sendgrid_API();
  addMiddlewares();
  addRoutes();
  startServer();
})();
