import express from "express";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
  //   console.log("✅ Contact API hit");
  // console.log("📦 Body:", req.body);
    const { name, email, message } = req.body;
    await sendEmail(
      process.env.EMAIL_USER, // your email
      "New Contact Message",
      `
        <h2>Contact Form</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `
    );
  
    res.json({ message: "Email sent" });

  } catch (error) {
     console.error("❌ Error:", error.message);
    res.status(500).json({message:"mail not sending",
         error: error.message });
  }
});

export default router;