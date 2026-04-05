import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🔥 Prompt builder
export const buildPrompt = (userMessage) => `
You are a helpful assistant for a Pandit Booking Application.

Your job:
- Answer basic questions about pooja
- Explain why pooja is performed
- Explain when pooja should be done
- Suggest correct pooja based on user problem
- Suggest which type of pandit is suitable
- Give average pandit price based on city (default: Delhi)

Rules:
- Keep answers simple and short
- Be clear and practical

Guidelines:
- Job/Career → Ganesh or Lakshmi Pooja
- Health → Maha Mrityunjaya Pooja
- Marriage → Vivah or Gauri Pooja
- Money → Lakshmi Pooja
- Peace/Negativity → Grah Shanti or Havan

City Pricing Example:
- Delhi:
  Small pooja: ₹1500–₹3000  
  Medium: ₹3000–₹7000  
  Havan: ₹7000–₹15000  

Response format:
- Pooja (if needed)
- Why this pooja
- When to perform
- Suitable pandit type
- Price (based on city)

User: ${userMessage}
`;

// 🔥 Fallback responses when AI is unavailable
const getFallbackResponse = (message) => {
  const lowerMessage = message.toLowerCase();

  // Job/Career related
  if (lowerMessage.includes('job') || lowerMessage.includes('career') || lowerMessage.includes('promotion') || lowerMessage.includes('business')) {
    return {
      reply: `- Pooja: Ganesh Pooja\n- Why this pooja: Lord Ganesha removes obstacles and brings success\n- When to perform: Tuesday or Wednesday morning\n- Suitable pandit type: Experienced pandit with Ganesha specialization\n- Price: ₹3000–₹7000 (Delhi)`,
      pooja: "Ganesh Pooja",
      pandits: []
    };
  }

  // Health related
  if (lowerMessage.includes('health') || lowerMessage.includes('sick') || lowerMessage.includes('ill') || lowerMessage.includes('disease')) {
    return {
      reply: `- Pooja: Maha Mrityunjaya Pooja\n- Why this pooja: For healing and protection from diseases\n- When to perform: Monday or during auspicious times\n- Suitable pandit type: Vedic pandit with healing expertise\n- Price: ₹5000–₹10000 (Delhi)`,
      pooja: "Maha Mrityunjaya Pooja",
      pandits: []
    };
  }

  // Marriage related
  if (lowerMessage.includes('marriage') || lowerMessage.includes('wedding') || lowerMessage.includes('love')) {
    return {
      reply: `- Pooja: Vivah Pooja\n- Why this pooja: For successful marriage and happy married life\n- When to perform: Before engagement or during wedding\n- Suitable pandit type: Marriage ceremony specialist\n- Price: ₹10000–₹25000 (Delhi)`,
      pooja: "Vivah Pooja",
      pandits: []
    };
  }

  // Money/Wealth related
  if (lowerMessage.includes('money') || lowerMessage.includes('wealth') || lowerMessage.includes('finance') || lowerMessage.includes('rich')) {
    return {
      reply: `- Pooja: Lakshmi Pooja\n- Why this pooja: Goddess Lakshmi brings prosperity and wealth\n- When to perform: Friday evening or Diwali time\n- Suitable pandit type: Wealth and prosperity specialist\n- Price: ₹4000–₹8000 (Delhi)`,
      pooja: "Lakshmi Pooja",
      pandits: []
    };
  }

  // Peace/Negativity removal
  if (lowerMessage.includes('peace') || lowerMessage.includes('negativity') || lowerMessage.includes('stress') || lowerMessage.includes('problem')) {
    return {
      reply: `- Pooja: Grah Shanti Havan\n- Why this pooja: Removes negative energies and brings peace\n- When to perform: During full moon or when facing difficulties\n- Suitable pandit type: Havan specialist pandit\n- Price: ₹7000–₹15000 (Delhi)`,
      pooja: "Grah Shanti Havan",
      pandits: []
    };
  }

  // Default response
  return {
    reply: `- Pooja: General Pooja Consultation\n- Why this pooja: Based on your specific needs\n- When to perform: Consult with pandit for auspicious time\n- Suitable pandit type: Experienced Vedic pandit\n- Price: ₹2000–₹5000 (Delhi)\n\nPlease provide more details about your specific situation for better recommendations.`,
    pooja: null,
    pandits: []
  };
};

// 🔥 Generate AI response
export const generateResponse = async (message) => {
  try {
    const prompt = buildPrompt(message);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);

    return result.response.text();

  } catch (err) {
    console.log("AI Error:", err);

    // Check if it's a rate limit or quota exceeded error
    if (err.status === 429 || err.status === 403 || err.message?.includes('quota') || err.message?.includes('rate limit')) {
      console.log("Using fallback response due to AI rate limit");
      return JSON.stringify(getFallbackResponse(message));
    }

    return "Sorry, I'm having trouble processing your request. Please try again.";
  }
};

// 🔥 Extract pooja
export const extractPooja = (text) => {
  const match = text.match(/- Pooja[:\s]*(.*)/i);
  return match ? match[1].trim() : null;
};