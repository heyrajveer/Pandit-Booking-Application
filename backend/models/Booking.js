const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
     required: true
  },

  panditId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pandit",
    required: true
  },

  date: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  phone: {
    type: String
  },

  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);