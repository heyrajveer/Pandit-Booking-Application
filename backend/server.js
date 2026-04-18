import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import panditRoutes from "./routes/panditRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);
// middleware
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:3000",
    process.env.FRONTEND_URL || ""
  ].filter(Boolean),
  credentials: true
}));

app.use(express.json());

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));

// database connect
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/pandit", panditRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/user", userRoutes);
app.use("/api/contact",contactRoutes);
app.use("/api",chatRoutes);

app.get("/", (req, res) => {
  res.send("server is running");
});


app.get("/api/test", (req, res) => {
  res.json({ message: "API working successfully 🚀" });
});



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`pandit application backend Server running at: http://localhost:${port}`);
});