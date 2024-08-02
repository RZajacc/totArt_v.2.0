import { RequestHandler } from "express";
import nodemailer from "nodemailer";

const sendEmailTest: RequestHandler = async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: "rf.zajac@gmail.com", pass: "Kkrulik#2" },
  });

  let mailOptions = {
    from: "rf.zajac@gmail.com",
    to: "rf.zajac@gmail.com",
    subject: "Test email",
    text: "Test email content",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent:" + info.response);
    }
  });
};

export { sendEmailTest };
