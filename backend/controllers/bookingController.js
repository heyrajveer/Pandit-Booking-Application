import Booking from "../models/Booking.js";
import Pandit from "../models/Pandit.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

export const createBooking = async (req, res) => {
  try {
    const { panditId, date, time, address, poojaType } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ error: "User not found in token" });
    }

    // ✅ Validate required fields
    if (!panditId || !date || !time || !address) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ fetch pandit
    const pandit = await Pandit.findById(panditId).populate("userId");

    if (!pandit) {
      return res.status(404).json({ error: "Pandit not found" });
    }

    // Prevent duplicate active booking for same pandit/date/time.
    const existingBooking = await Booking.findOne({
      panditId,
      date,
      time,
      status: { $ne: "cancelled" }
    });

    if (existingBooking) {
      return res.status(409).json({ error: "Selected time slot is already booked" });
    }

    const booking = await Booking.create({
      userId,
      panditId,
      date,
      time,
      address,
      poojaType: poojaType || "General Pooja"
    });

    // ✅ get email from pandit's user
    const panditEmail = pandit.userId?.email;

    // ✅ get user email
    const user = await User.findById(userId);
    const userEmail = user?.email;

    // 📧 send email to PANDIT
    if (panditEmail) {
      await sendEmail(
        panditEmail,
        "New Booking Request",
        `
        <h2>New Booking Request</h2>
        <p><strong>User:</strong> ${user?.name}</p>
        <p><strong>Pooja Type:</strong> ${poojaType || "General Pooja"}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Location:</strong> ${address}</p>
      `
      );
    }

    // 📧 send email to USER
    if (userEmail) {
      await sendEmail(
        userEmail,
        "Booking Confirmation",
        `
        <h2>Your Booking is Confirmed!</h2>
        <p><strong>Pandit:</strong> ${pandit.name}</p>
        <p><strong>Pooja Type:</strong> ${poojaType || "General Pooja"}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Location:</strong> ${address}</p>
        <p>Your pandit will confirm the booking shortly.</p>
      `
      );
    }

    res.status(201).json(booking);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "Selected time slot is already booked" });
    }
    res.status(500).json({ error: error.message });
  }
};

export const getPanditSlots = async (req, res) => {
  try {
    const { panditId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Date query parameter is required" });
    }

    const bookings = await Booking.find({
      panditId,
      date,
      status: { $ne: "cancelled" }
    }).select("time status -_id");

    const bookedSlots = bookings.map((booking) => booking.time);
    res.status(200).json({ date, bookedSlots });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateBookingDetails = async (req, res) => {
  try {
    const { address, poojaType } = req.body;
    const bookingId = req.params.id;
    const userId = req.user.id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.userId.toString() !== userId) {
      return res.status(403).json({ error: "Not authorized to update this booking" });
    }

    if (booking.status !== "pending") {
      return res.status(403).json({ error: "Can only update pending bookings" });
    }

    booking.address = address || booking.address;
    booking.poojaType = poojaType || booking.poojaType;

    await booking.save();

    res.status(200).json(booking);
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
     .populate("userId")
      .populate({
        path: "panditId",
        populate: { path: "userId" }
      });
  
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (req.user.role === "user") {
      if (booking.userId._id.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not your booking" });
      }

      if (booking.status !== "pending") {
        return res.status(403).json({ message: "You can only cancel a pending booking." });
      }

      booking.status = "cancelled";
    }

    else if (req.user.role === "pandit") {
      const pandit = await Pandit.findOne({ userId: req.user.id });

      if (!pandit) {
        return res.status(403).json({ message: "Pandit not found" });
      }

      if (booking.panditId._id.toString() !== pandit._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }

      if (status === "confirmed") {
        if (booking.status !== "pending") {
          return res.status(403).json({ message: "Only pending bookings can be confirmed." });
        }
        booking.status = "confirmed";
      } else if (status === "completed") {
        if (booking.status !== "confirmed") {
          return res.status(403).json({ message: "Only confirmed bookings can be completed." });
        }
        booking.status = "completed";
      } else if (status === "cancelled") {
        if (booking.status !== "pending" && booking.status !== "confirmed") {
          return res.status(403).json({ message: "Only pending or confirmed bookings can be cancelled." });
        }
        booking.status = "cancelled";
      } else {
        return res.status(400).json({ message: "Invalid status update." });
      }
    }
    else {
      return res.status(403).json({ message: "Not authorized" });
    }

    await booking.save();

    // ✅ send email to USER
    const userEmail = booking.userId?.email;
    if (userEmail) {
      let subject = "";
      let message = "";

      if (status === "confirmed") {
        subject = "Booking Confirmed ✅";
        message = `
          <h2>Your Booking is Confirmed!</h2>
          <p><strong>Pandit:</strong> ${booking.panditId.userId?.name}</p>
          <p><strong>Date:</strong> ${booking.date}</p>
          <p><strong>Time:</strong> ${booking.time}</p>
          <p>Thank you for booking with us!</p>
        `;
      } else if (status === "completed") {
        subject = "Booking Completed - Rate Your Experience ⭐";
        message = `
          <h2>Your Booking is Complete!</h2>
          <p>Thank you for using our service. We'd love to hear about your experience!</p>
          <p><strong>Pandit:</strong> ${booking.panditId.userId?.name}</p>
          <p><strong>Date:</strong> ${booking.date}</p>
          <p>You can now rate and review this pandit in your bookings.</p>
        `;
      } else if (status === "cancelled") {
        subject = "Booking Cancelled";
        message = `
          <h2>Your Booking has been Cancelled</h2>
          <p><strong>Date:</strong> ${booking.date}</p>
          <p><strong>Time:</strong> ${booking.time}</p>
          <p>If you have any questions, please contact us.</p>
        `;
      }

      if (message) {
        await sendEmail(userEmail, subject, message);
      }
    }

    res.json(booking);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};