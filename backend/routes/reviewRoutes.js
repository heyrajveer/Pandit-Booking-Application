import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  createReview,
  getPanditReviews,
  getReviewEligibility,
  getBookingReview,
  updateReview,
  reportReview
} from "../controllers/reviewController.js";

const router = express.Router();

// public review list for a pandit
router.get("/pandit/:panditId", getPanditReviews);

// get review for a specific booking
router.get("/booking/:bookingId", verifyToken, getBookingReview);

// user eligibility and existing review info
router.get("/eligibility/:panditId", verifyToken, getReviewEligibility);

// create review after completed booking
router.post("/", verifyToken, createReview);

// edit review within allowed window
router.patch("/:id", verifyToken, updateReview);

// report inappropriate review
router.post("/:id/report", verifyToken, reportReview);

export default router;
