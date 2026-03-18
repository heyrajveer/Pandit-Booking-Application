const express=require("express");
const dotenv =require("dotenv");
const cors =require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes =require("./routes/bookingRoutes");
const panditRoutes =require("./routes/panditRoutes");
const userRoutes =require("./routes/userRoutes");
dotenv.config();
const app =express();

const cookieParser = require("cookie-parser");

app.use(cookieParser()); // 👈 must
//middel ware

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());

//databse connect
connectDB();

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/pandit", panditRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/user",userRoutes);

app.get("/",(req,res)=>{
    res.send("server is running");
})

app.get("/api/test", (req, res) => {
  res.json({ message: "API working successfully 🚀" });
});
  
const port =process.env.PORT ||3000;
app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`);
});
