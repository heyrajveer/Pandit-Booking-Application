const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  panditId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pandit"
  },

  date: String,
  time: String,

  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);