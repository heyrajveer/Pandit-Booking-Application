const Booking = require("../models/Booking");
const Pandit = require("../models/Pandit");

exports.createBooking = async (req, res) => {
  try {
    const { panditId, date, time, address } = req.body;
      const userId = req.user?.id;
      // console.log("USER:", req.user);
      // console.log("USER ID:", userId);
    if (!userId) {
      return res.status(400).json({ error: "User not found in token" });
    }
    const booking = await Booking.create({
      userId: req.user.id,
      panditId,
      date,
      time,
      address,
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getBookings = async (req, res) => {
  try {
    let bookings;

    // 🔹 USER
    if (req.user.role === "user") {
      bookings = await Booking.find({ userId: req.user.id })
        .populate("panditId");
    }
    

    // 🔹 PANDIT (FIXED)
    else if (req.user.role === "pandit") {


      const pandit = await Pandit.findOne({ userId: req.user.id });

      if (!pandit) {
        return res.status(404).json({ message: "Pandit profile not found" });
      }

      bookings = await Booking.find({ panditId: pandit._id })
        .populate("userId");
    }

    // 🔹 ADMIN
    else {
      bookings = await Booking.find()
        .populate("userId")
        .populate("panditId");
    }

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};