import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Pandit from "../models/Pandit.js";
import panditSeedData from "./data.js";

dotenv.config();

async function seedDB() {
  try {
    await connectDB();

    console.log("Deleting old pandit users and profiles...");
    await Pandit.deleteMany({});
    await User.deleteMany({ role: "pandit" });

    const hashedPassword = await bcrypt.hash("123456", 10);

    const userDocs = panditSeedData.map((item) => ({
      name: item.name,
      email: item.email,
      password: hashedPassword,
      role: "pandit",
      city: item.city,
      phone: item.phone
    }));

    console.log(`Inserting ${userDocs.length} pandit users...`);
    const users = await User.insertMany(userDocs, { ordered: true });

    const panditDocs = users.map((user, index) => ({
      userId: user._id,
      city: user.city,
      experience: panditSeedData[index].experience,
      price: panditSeedData[index].price,
      services: panditSeedData[index].services,
      description: panditSeedData[index].description || "Experienced pandit"
    }));

    console.log(`Inserting ${panditDocs.length} pandit profiles...`);
    await Pandit.insertMany(panditDocs, { ordered: true });
    
    console.log("✅ Seeded pandit data successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seedDB();
