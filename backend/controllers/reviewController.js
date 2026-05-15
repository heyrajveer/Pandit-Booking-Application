import mongoose from "mongoose";
import Review from "../models/Review.js";
import Booking from "../models/Booking.js";
import Pandit from "../models/Pandit.js";

const updatePanditRatingStats = async (panditId) => {
  const stats = await Review.aggregate([
    { $match: { panditId: new mongoose.Types.ObjectId(panditId), status: "active" } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        ratingCount: { $sum: 1 }
      }
    }
  ]);

  const averageRating = stats[0]?.averageRating
    ? Number(stats[0].averageRating.toFixed(1))
    : 0;
  const ratingCount = stats[0]?.ratingCount || 0;

  await Pandit.findByIdAndUpdate(panditId, {
    averageRating,
    ratingCount
  });

  return { averageRating, ratingCount };
};

export const getPanditReviews = async (req, res) => {
  try {
    const panditId = req.params.panditId;
    const reviews = await Review.find({ panditId, status: "active" })
      .sort({ createdAt: -1 })
      .populate("userId", "name");

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReviewEligibility = async (req, res) => {
  try {
    const panditId = req.params.panditId;
    const userId = req.user.id;

    const bookings = await Booking.find({
      panditId,
      userId,
      status: "completed"
    });

    if (!bookings.length) {
      return res.status(200).json({
        canReview: false,
        reason: "No completed booking found for this pandit."
      });
    }

    const bookingIds = bookings.map((b) => b._id);
    const existingReviews = await Review.find({ bookingId: { $in: bookingIds } });
    const reviewedBookingIds = new Set(
      existingReviews.map((review) => review.bookingId.toString())
    );

    const pendingBooking = bookings.find(
      (booking) => !reviewedBookingIds.has(booking._id.toString())
    );

    if (pendingBooking) {
      return res.status(200).json({
        canReview: true,
        bookingId: pendingBooking._id,
        bookingDate: pendingBooking.date
      });
    }

    const firstReview = existingReviews[0];
    const editableUntil = new Date(firstReview.createdAt);
    editableUntil.setDate(editableUntil.getDate() + 7);

    res.status(200).json({
      canReview: false,
      existingReview: firstReview,
      editableUntil,
      reason: "You have already submitted feedback for your completed booking."
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { bookingId, rating, review, panditId } = req.body;
    const userId = req.user.id;

    if (!bookingId || !rating || !panditId) {
      return res.status(400).json({ error: "Booking, pandit, and rating are required." });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5." });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    if (booking.userId.toString() !== userId) {
      return res.status(403).json({ error: "You may only review your own booking." });
    }

    if (booking.panditId.toString() !== panditId) {
      return res.status(400).json({ error: "Pandit mismatch for booking." });
    }

    if (booking.status !== "completed") {
      return res.status(403).json({ error: "Only completed bookings can be reviewed." });
    }

    const existingReview = await Review.findOne({ bookingId });
    if (existingReview) {
      return res.status(409).json({ error: "A review already exists for this booking." });
    }

    const newReview = await Review.create({
      bookingId,
      panditId,
      userId,
      rating,
      review: review || ""
    });

    await updatePanditRatingStats(panditId);

    res.status(201).json(newReview);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "A review already exists for this booking." });
    }
    res.status(500).json({ error: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id;
    const { rating, review } = req.body;

    const existingReview = await Review.findById(reviewId);
    if (!existingReview) {
      return res.status(404).json({ error: "Review not found." });
    }

    if (existingReview.userId.toString() !== userId) {
      return res.status(403).json({ error: "You can only edit your own review." });
    }

    const editableUntil = new Date(existingReview.createdAt);
    editableUntil.setDate(editableUntil.getDate() + 7);
    if (new Date() > editableUntil) {
      return res.status(403).json({ error: "Review editing window has expired." });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: "Rating must be between 1 and 5." });
    }

    existingReview.rating = rating || existingReview.rating;
    existingReview.review = review ?? existingReview.review;
    await existingReview.save();

    await updatePanditRatingStats(existingReview.panditId);

    res.status(200).json(existingReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookingReview = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const userId = req.user.id;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    if (booking.userId.toString() !== userId) {
      return res.status(403).json({ error: "You can only view reviews for your own bookings." });
    }

    const review = await Review.findOne({ bookingId }).populate("panditId", "userId");
    res.status(200).json({ review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const reportReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id;

    const existingReview = await Review.findById(reviewId);
    if (!existingReview) {
      return res.status(404).json({ error: "Review not found." });
    }

    if (existingReview.userId.toString() === userId) {
      return res.status(403).json({ error: "You cannot report your own review." });
    }

    if (existingReview.reportedBy.includes(userId)) {
      return res.status(400).json({ error: "You have already reported this review." });
    }

    const wasActive = existingReview.status === "active";
    existingReview.reportCount += 1;
    existingReview.reportedBy.push(userId);

    if (existingReview.reportCount >= 3) {
      existingReview.status = "reported";
    }

    await existingReview.save();

    if (wasActive && existingReview.status !== "active") {
      await updatePanditRatingStats(existingReview.panditId);
    }

    res.status(200).json({ message: "Review reported successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
