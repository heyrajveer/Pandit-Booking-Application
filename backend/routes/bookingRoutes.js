import express from "express";
import {
  createBooking,
  getBookings,
  updateBookingStatus
} from "../controllers/bookingController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// create booking
router.post("/create", verifyToken, createBooking);

// get all bookings
router.get("/my-bookings", verifyToken, getBookings);

router.get("/pandit-requests", verifyToken, getBookings);
// user cancel booking
router.patch("/:id/cancel", verifyToken, updateBookingStatus);

// update request status by pandit
router.patch("/:id/status", verifyToken,roleMiddleware("pandit"), updateBookingStatus);

export default router;