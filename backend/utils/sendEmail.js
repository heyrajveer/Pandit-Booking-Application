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
        user:"thinkercreative25@gmail.com" ,
        pass:"cspzbncbyybilkzh"
      }
    });

    await transporter.sendMail({
      from:"thinkercreative25@gmail.com",
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