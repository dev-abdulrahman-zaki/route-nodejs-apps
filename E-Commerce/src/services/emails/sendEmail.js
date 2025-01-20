import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplate.js";
import jwt from "jsonwebtoken";

export const sendEmail = async (email, subject, text) => {
  // 01 - create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 02 - create JWT token then, callback send the email
  jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
    async (err, token) => {
      if (err) {
        console.error("JWT Sign Error:", err);
        return res.status(500).json({ message: "Error generating token" });
        /*
        or:
        // throw new SystemError("Error generating token", 500);
        // SystemError can be used but requires some changes.
        - Key changes made:
          - Added a try/catch block to handle any errors
          - Converted callback-based jwt.sign to Promise-based using new Promise
        */
      }
      const info = await transporter.sendMail({
        from: `FreshCart Inc. <${process.env.EMAIL_USER}>`, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: emailTemplate(token), // html body
      });
      console.log(`sendMail info:`, info);
    }
  );
};

// Approach 2: Using try/catch block
/*
export const sendEmail = async (email, subject, text) => {
  try {
    // 01 - create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // 02 - create JWT token
    const token = await new Promise((resolve, reject) => {
      jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.error("JWT Sign Error:", err);
            reject(err);
          }
          resolve(token);
        }
      );
    });

    // 03 - send the email
    const info = await transporter.sendMail({
      from: `FreshCart Inc. <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      text: text,
      html: emailTemplate(token),
    });
    console.log(`sendMail info:`, info);
    return info;

  } catch (error) {
    throw new SystemError(
      error.message || "Failed to send email",
      500
    );
  }
};
*/