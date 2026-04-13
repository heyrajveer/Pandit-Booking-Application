import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Pandit from "../models/Pandit.js";
import panditSeedData from "./data.js";

dotenv.config();

async function seedDB() {
  try {
    await connectDB();

    // Delete only existing pandit users and their pandit profiles
    await Pandit.deleteMany({});
    await User.deleteMany({ role: "pandit" });

    for (const item of panditSeedData) {
      const user = await User.create({
        name: item.name,
        email: item.email,
        password: "123456",
        role: "pandit",
        city: item.city,
        phone: item.phone
      });

      await Pandit.create({
        userId: user._id,
        experience: item.experience,
        price: item.price,
        services: item.services,
        description: item.description || "Experienced pandit"
      });
    }

    console.log("✅ Seeded pandit data successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seedDB();
