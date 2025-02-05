import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import "dotenv/config";
import userModel from "../models/userModel.js";
import { PassportStatic } from "passport";
import { JwtPayload } from "jsonwebtoken";
import { HydratedDocument } from "mongoose";
import { User } from "../types/UserTypes.js";
import path from "path";

const opts = {
  secretOrKey: process.env.SECRET_OR_PRIVATE_KEY as string,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// 1. Define a strategy
const jwtStrategy = new JwtStrategy(opts, async function (
  jwt_payload: JwtPayload,
  done
) {
  try {
    const user: HydratedDocument<User> | null = await userModel
      .findById(jwt_payload.sub)
      .populate({ path: "userImage" })
      .populate({ path: "favs", select: ["title"] })
      .populate({
        path: "posts",
        select: ["title", "image"],
        populate: { path: "image", select: ["public_id"] },
      });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    console.log("Passport error block");
    return done(err, false);
  }
});

// 2. Use strategy with passport
const passportConfig = (passport: PassportStatic) => {
  passport.use(jwtStrategy);
};

export default passportConfig;
