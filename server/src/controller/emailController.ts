import { RequestHandler } from "express";

const sendEmailTest: RequestHandler = async (req, res) => {
  res.status(200).json({ msg: "Hello" });
};

export { sendEmailTest };
