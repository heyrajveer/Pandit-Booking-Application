import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { name, email, password, role, city, phone } = req.body;

    // 🔹 Required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All required fields are missing ❌"
      });
    }

    const normalizedEmail = email.toLowerCase();

    // 🔹 Check user exists
    const userExist = await User.findOne({ email: normalizedEmail });
   if (userExist) {
  return res.status(400).json({
    message: "User already exists"
  });
}
    // 🔹 Hash password
    // const hashPassword = await bcrypt.hash(password, 10);

    // 🔹 Create user
    const user = new User({
      name,
      email: normalizedEmail,
      // password: hashPassword,
      password,
      role,
      city,
      phone
    });


    await user.save();
    // console.log("BODY 👉", user);
    res.status(201).json({
      message:"User registered successfully"
    });

  } catch (err) {

    // 🔹 Schema validation error
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(err.errors)[0].message,
      });
    }

    res.status(500).json({
      message: err.message || "Server error",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
      // console.log("BODY 👉", req.body);
    const user = await User.findOne({ email });

     if (!email || !password) {
      return res.status(400).json({
        message: "All required fields are missing ❌"
      });
    }
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // 🔥 tokens
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // 🔥 set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,        // production me true
      sameSite: "lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    // 🔥 send only safe data
    res.json({
      message: "Login successful",
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const logout = (req, res) => {
  res.clearCookie("token"); // 🔥 remove cookie
  res.json({ message: "Logged out successfully" });
};
