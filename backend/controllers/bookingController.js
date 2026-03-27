import Booking from "../models/Booking.js";
import Pandit from "../models/Pandit.js";

export const createBooking = async (req, res) => {
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


export const getBookings = async (req, res) => {
  try {
    let bookings;

    // console.log("REQ.USER:", req.user);

    // 🔹 USER → see own bookings
    if (req.user.role === "user") {
      bookings = await Booking.find({ userId: req.user.id })
        .populate({
          path: "panditId",
          populate: {
            path: "userId",
            select: "name city phone"
          }
        });
    }

    // 🔹 PANDIT → see assigned bookings
    else if (req.user.role === "pandit") {
      const pandit = await Pandit.findOne({ userId: req.user.id });

      // console.log("PANDIT:", pandit);

      if (!pandit) {
        return res.status(404).json({ message: "Pandit profile not found" });
      }

      bookings = await Booking.find({ panditId: pandit._id })
        .populate({
          path: "userId",
          select: "name email"
        });
    }

    // 🔹 ADMIN → see all
    else {
      bookings = await Booking.find()
        .populate("userId")
        .populate("panditId");
    }

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(booking);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};