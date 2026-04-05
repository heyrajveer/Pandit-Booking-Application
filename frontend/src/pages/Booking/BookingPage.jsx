import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function BookingPage() {
  const { id } = useParams(); // 👉 panditId
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [poojaType, setPoojaType] = useState("");

  const poojaOptions = [
    "Griha Pravesh",
    "Satyanarayan Pooja",
    "Wedding",
    "Havan",
    "Other"
  ];

  const handleBooking = async () => {
    try {
      if (!date || !time || !address || !poojaType) {
        return alert("Please fill all fields");
      }

      await axios.post(
        "http://localhost:8000/api/booking/create",
        {
          panditId: id,   // ✅ from URL
          date,
          time,
          address,
          poojaType
        },
        {
          withCredentials: true
        }
      );

      alert("Booking Successful ✅");
      navigate("/my-bookings");

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Booking Failed ❌");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="mb-4 text-center">Book Pandit</h3>

      <div className="mb-3">
        <label>Pooja Type</label>
        <select
          className="form-control"
          value={poojaType}
          onChange={(e) => setPoojaType(e.target.value)}
        >
          <option value="">Select Pooja Type</option>
          {poojaOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label>Date</label>
        <input
          type="date"
          className="form-control"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Time</label>
        <input
          type="time"
          className="form-control"
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter address"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <button className="btn btn-success w-100" onClick={handleBooking}>
        Confirm Booking
      </button>
    </div>
  );
}

export default BookingPage;