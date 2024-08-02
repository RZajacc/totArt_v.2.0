import express from "express";
import { sendEmailTest } from "../controller/emailController.js";

const router = express.Router();

router.post("/sendEmail", sendEmailTest);

export default router;
