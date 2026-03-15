const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {

    const booking = new Booking(req.body);

    await booking.save();

    res.json({ message: "Booking successful", booking });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getBookings = async (req, res) => {
  try {

    const bookings = await Booking.find()
      .populate("userId")
      .populate("panditId");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};