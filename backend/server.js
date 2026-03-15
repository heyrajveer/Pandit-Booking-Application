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


//middel ware
app.use(express.json());
app.use(cors());

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
  
const port =process.env.PORT ||3000;
app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`);
});