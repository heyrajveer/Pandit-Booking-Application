import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
    unique: true
  },
  panditId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pandit",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    trim: true,
    default: ""
  },
  status: {
    type: String,
    enum: ["active", "reported", "removed"],
    default: "active"
  },
  reportCount: {
    type: Number,
    default: 0
  },
  reportedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
