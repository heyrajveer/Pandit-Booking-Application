import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please use a valid email address ❌",
    ],
  },

  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters ❌"],
  },

  role: {
    type: String,
    enum: ["user", "pandit"],
    default: "user"
  },

  city: String,

  phone: {
    type: String,
    required: true,
    match: [
      /^[0-9]{10}$/,
      "Phone number must be 10 digits ❌",
    ],
  },

  profileImage: {
    type: String,
    default: ""
  }

}, { timestamps: true });


// password hashing middleware
userSchema.pre("save", async function () {

  try {

    // console.log("Pre-save middleware running");

    if (!this.isModified("password")) {
      return;
    }

    this.password =
      await bcrypt.hash(this.password, 10);

    // console.log("Password hashed successfully");

  } catch (error) {

    // console.log("HASH ERROR:", error);

    throw error;
  }
});

const User = mongoose.model("User", userSchema);

export default User;