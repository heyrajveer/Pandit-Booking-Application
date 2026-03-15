const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const {
  createBooking,
  getBookings
} = require("../controllers/bookingController");


// create booking
router.post("/create", verifyToken, createBooking);

// get all bookings
router.get("/", verifyToken, getBookings);

module.exports = router;