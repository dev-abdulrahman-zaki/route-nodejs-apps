import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplate.js";
import jwt from "jsonwebtoken";

export const sendEmail = async (email) => {
  // 01 - create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 02 - send the email
  jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
    async (err, token) => {
      if (err) {
        console.error("JWT Sign Error:", err);
        return res.status(500).json({ message: "Error generating token" });
      }
      const info = await transporter.sendMail({
        from: `Hi :) <${process.env.EMAIL_USER}>`, // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: emailTemplate(token), // html body
      });
      console.log(`sendMail info:`, info);
    }
  );
};
