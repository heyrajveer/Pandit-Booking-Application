import express from "express";
import Pandit from "../models/Pandit.js";
import { generateResponse, extractPooja } from "../utils/ai.js";

const router = express.Router();

// ✅ CHAT API
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    // 1. AI response (could be string or JSON string)
    const aiReply = await generateResponse(message);

    let responseData;

    // Check if response is JSON (fallback) or plain text (AI)
    try {
      responseData = JSON.parse(aiReply);
    } catch (e) {
      // AI response is plain text, extract pooja manually
      const pooja = extractPooja(aiReply);
      responseData = {
        reply: aiReply,
        pooja: pooja,
        pandits: []
      };
    }

    // 2. Find matching pandits if pooja found
    if (responseData.pooja) {
      responseData.pandits = await Pandit.find({
        services: { $regex: responseData.pooja, $options: "i" }
      })
        .select("name price experience services profileImage")
        .limit(3);
    }

    res.json(responseData);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;