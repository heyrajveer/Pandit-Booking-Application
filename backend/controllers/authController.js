import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const isProd = process.env.NODE_ENV === "production";

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { name, email, password, role, city, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All required fields are missing ❌"
      });
    }

    const normalizedEmail = email.toLowerCase();

    const userExist = await User.findOne({ email: normalizedEmail });
    if (userExist) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = new User({
      name,
      email: normalizedEmail,
      password, // will be hashed by pre-save middleware
      role,
      city,
      phone
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (err) {
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

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All required fields are missing ❌"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // 🔥 Tokens
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

    // 🔥 Cookies (FIXED)
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= LOGOUT =================
export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });

  res.json({ message: "Logged out successfully" });
};

// ================= REFRESH TOKEN =================
export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

    const accessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Token refreshed" });

  } catch (error) {
    return res.status(401).json({ message: "Refresh failed" });
  }
};