import nodemailer from "nodemailer";
import dotenv, { config } from "dotenv";
dotenv.config();
const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure:true,
      port:465,
      auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS

      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    });

    console.log("Email sent ✅");
  } catch (error) {
    console.log("Email error:", error);
  }
};

export default sendEmail;