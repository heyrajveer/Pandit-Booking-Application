import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import panditRoutes from "./routes/panditRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// database connect
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/pandit", panditRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/user", userRoutes);
app.use("/api/contact",contactRoutes);

app.get("/", (req, res) => {
  res.send("server is running");
});


app.get("/api/test", (req, res) => {
  res.json({ message: "API working successfully 🚀" });
});



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});