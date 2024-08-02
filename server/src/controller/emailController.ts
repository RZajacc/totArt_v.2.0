import { RequestHandler } from "express";
import nodemailer from "nodemailer";

const sendEmailTest: RequestHandler = async (req, res) => {
  res.status(200).json({ msg: "Hello" });
};

export { sendEmailTest };
