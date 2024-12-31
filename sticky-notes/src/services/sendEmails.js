import nodemailer from "nodemailer";

export const sendEmail = async () => {
  // 01 - create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 02 - send the email
  const info = await transporter.sendMail({
    from: `Hi :) <${process.env.EMAIL_USER}>`, // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  console.log(`sendMail info:`, info);
};
