import { RequestHandler } from "express";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey("");

const sendEmailTest: RequestHandler = async (req, res) => {
  const msg = {
    to: "rf.zajac@gmail.com", // Change to your recipient
    from: {
      email: "rf.zajac@tutamail.com",
      name: "totArt",
    },
    subject: "Sending with SendGrid is Fun",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
};

export { sendEmailTest };
