import connectDB from "../config/db.js";
import User from "../models/User.js";
import Pandit from "../models/Pandit.js";
import panditSeedData from "./data.js";
import dotenv from "dotenv";
dotenv.config();
const seedDB = async () => {
  try {
    await connectDB();

    // await User.deleteMany();
    // await Pandit.deleteMany();

    for (let p of panditSeedData) {
      const user = await User.create({
        name: p.name,
        email: p.email,
        password: "123456",
        role: "pandit",
        city: p.city,
        phone: p.phone
      });

      await Pandit.create({
        userId: user._id,
        experience: p.experience,
        price: p.price,
        services: p.services,
        description: "Experienced pandit"
      });
    }

    console.log("✅ Data Seeded Successfully");
    process.exit();

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedDB();