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
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending"
  }
}, { timestamps: true });

// Ensure a pandit can only have one active booking per date and slot
bookingSchema.index(
  { panditId: 1, date: 1, time: 1 },
  { unique: true, partialFilterExpression: { status: { $ne: "cancelled" } } }
);

// ✅ create modelst Booking
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;