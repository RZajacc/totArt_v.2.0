import express from "express";
import { sendContactEmail } from "../controller/emailController.js";

const router = express.Router();

router.post("/sendEmail", sendContactEmail);

export default router;
