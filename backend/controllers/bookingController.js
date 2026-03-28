import Booking from "../models/Booking.js";
import Pandit from "../models/Pandit.js";
import sendEmail from "../utils/sendEmail.js";


export const createBooking = async (req, res) => {
  try {
    const { panditId, date, time, address } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ error: "User not found in token" });
    }

    // ✅ fetch pandit
    const pandit = await Pandit.findById(panditId).populate("userId");

    if (!pandit) {
      return res.status(404).json({ error: "Pandit not found" });
    }

    const booking = await Booking.create({
      userId,
      panditId,
      date,
      time,
      address,
    });

    // ✅ get email from pandit's user
    const panditEmail = pandit.userId?.email;

    // 📧 send email
    if (panditEmail) {
      await sendEmail(
        panditEmail,
        "New Booking Request",
        `
        <h2>New Booking</h2>
        <p>Date: ${date}</p>
        <p>Time: ${time}</p>
      `
      );
    }

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

    // 🔍 find booking first
    const booking = await Booking.findById(req.params.id)
     .populate("userId") // ✅ ADD THIS
      .populate({
        path: "panditId",
        populate: { path: "userId" }
      });
  
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

 // ✅ USER → cancel booking
    if (req.user.role === "user") {
      if (booking.userId._id.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not your booking" });
      }

      booking.status = "cancelled";
    }
    // console.log("USER EMAIL:", booking.userId);
    
    else if (req.user.role === "pandit") {
    // 🔥 find pandit of logged-in user

    const pandit = await Pandit.findOne({ userId: req.user.id });


    if (!pandit) {
      return res.status(403).json({ message: "Pandit not found" });
    }

    

    // 🔥 check if this pandit owns the booking
    if (booking.panditId._id.toString() !== pandit._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ✅ update status
    booking.status = status;
  }
    await booking.save();

   
    // ✅ send email to USER (not pandit)
    if (["cancelled", "confirmed", "rejected"].includes(status)) {
      const email = booking.userId?.email;
 console.log("📧 Sending to:", email);
      if (email) {
        await sendEmail(
          email,
          `Booking ${status}`,
          `
          <h2>Booking ${status.toUpperCase()}</h2>
          <p>Date: ${booking.date}</p>
          <p>Time: ${booking.time}</p>
        `
        );
      }
    }

    res.json(booking);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};