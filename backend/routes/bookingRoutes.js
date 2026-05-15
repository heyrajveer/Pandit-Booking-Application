import express from "express";
import {
  createBooking,
  getBookings,
  updateBookingStatus,
  getPanditSlots,
  updateBookingDetails
} from "../controllers/bookingController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import bookingLimiter from "../middlewares/bookingLimiter.js";

const router = express.Router();

// create booking with rate limiting
router.post("/create", verifyToken, bookingLimiter, createBooking);

// get booked slots for a pandit on a given date
router.get("/slots/:panditId", getPanditSlots);

// get all bookings
router.get("/my-bookings", verifyToken, getBookings);

router.get("/pandit-requests", verifyToken, getBookings);
// user cancel booking
router.patch("/:id/cancel", verifyToken, updateBookingStatus);
// update booking status (accept/reject/complete)
router.patch("/:id/status", verifyToken, updateBookingStatus);

// update booking details (user can edit pending bookings)
router.patch("/:id/details", verifyToken, updateBookingDetails);

export default router;