import mongoose from "mongoose";

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
  poojaType: {
    type: String,
    default: "General Pooja"
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  }
}, { timestamps: true });

// ✅ create modelst Booking
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;