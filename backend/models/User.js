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
    minlength: 6,
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


// 🔥 ADD THIS HERE (NOT IN CONTROLLER)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  if (this.password.length < 6) {
    return next(new Error("Password must be at least 6 characters ❌"));
  }

  this.password = await bcrypt.hash(this.password, 10);

});
const User = mongoose.model("User", userSchema);
export default User;