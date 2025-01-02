import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplate.js";
import jwt from "jsonwebtoken";
import { catchError } from "../../middlewares/catchError.js";

export const sendEmail = catchError(async (email, subject, text, next) => {
  // 01 - create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 02 - send the email
  return new Promise((resolve, reject) => {
    jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      async (err, token) => {
        if (err) {
          console.error("JWT Sign Error:", err);
          return next(new SystemError("Error generating token", 500));
        }
        const info = await transporter.sendMail({
          from: `StickyNotes Inc. <${process.env.EMAIL_USER}>`, // sender address
          to: email, // list of receivers
          subject: subject, // Subject line
          text: text, // plain text body
          html: emailTemplate(token), // html body
        });
        console.log(`sendMail info:`, info);
      }
    );
  });
});
