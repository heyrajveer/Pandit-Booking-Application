import express from "express";
import {
  createBooking,
  getBookings,
  updateBookingStatus
} from "../controllers/bookingController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// create booking
router.post("/create", verifyToken, createBooking);

// get all bookings
router.get("/my-bookings", verifyToken, getBookings);

// update request status by pandit
router.patch("/:id/status", verifyToken, updateBookingStatus);

export default router;