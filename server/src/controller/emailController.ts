import { RequestHandler } from "express";
import sgMail from "@sendgrid/mail";

const sendContactEmail: RequestHandler = async (req, res) => {
  // Gather inputs and types
  const inputs: {
    name: string;
    email: string;
    subject: string;
    message: string;
  } = req.body;

  // Prepare message to be sent
  const msg = {
    to: "rf.zajac@gmail.com",
    from: {
      email: "rf.zajac@tutamail.com",
      name: "totArt",
    },
    subject: inputs.subject,
    html: `
    <p><strong>From:</strong> ${inputs.name}</p>
    <p><strong>Email:</strong> ${inputs.email}</p>
    <p>${inputs.message}</p>
    `,
  };

  // Send an email using sendgrid
  sgMail
    .send(msg)
    .then((response) => {
      res.status(response[0].statusCode).json({
        msg: "Email was sent successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
};

export { sendContactEmail };
