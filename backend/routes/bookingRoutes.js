const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const {
  createBooking,
  getBookings,
  updateBookingStatus
} = require("../controllers/bookingController");


// create booking
router.post("/create", verifyToken, createBooking);

// get all bookings
router.get("/my-bookings", verifyToken, getBookings);
//update  request status by pandit
router.patch("/:id/status", verifyToken, updateBookingStatus);

module.exports = router;