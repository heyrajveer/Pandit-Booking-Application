import { useEffect, useState } from "react";
import { getMyBookings } from "../../api/bookingApi";
import axios from "axios";

function MyBooking() {
  const [bookings, setBookings] = useState([]);

  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getMyBookings();
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, []);
  const cancelBooking = async (id) => {
  try {
    if (!window.confirm("Cancel this booking request?")) return;

    await axios.patch(
      `http://localhost:8000/api/booking/${id}/status`,
      { status: "cancelled" },   // ✅ same API
      { withCredentials: true }
    );

    alert("Booking cancelled successfully ❌");

    // 🔥 refresh bookings
    const res = await getMyBookings();
    setBookings(res.data);

  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};

  return (
    <div className="container py-5" style={{ marginTop: "80px" }}>
      
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">My Bookings</h2>
        <p className="text-muted">Track all your pandit bookings</p>
      </div>

      {/* No bookings */}
      {bookings.length === 0 ? (
        <div className="text-center">
          <h5 className="text-muted">No bookings found</h5>
        </div>
      ) : (
        <div className="row g-4">
          {bookings.map((b) => (
            <div key={b._id} className="col-md-6 col-lg-4">
              
              <div className="card border-0 shadow-lg h-100 rounded-4 booking-card">
                
                {/* Card Body */}
                <div className="card-body">
                  
                  {/* Pandit Info */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h5 className="fw-semibold mb-1">
                        {b.panditId?.userId?.name || "Pandit"}
                      </h5>
                      <small className="text-muted">
                        📍 {b.panditId?.userId?.city}
                      </small>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`badge px-3 py-2 ${
                        b.status === "confirmed"
                          ? "bg-success"
                          : b.status === "cancelled"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <hr />

                  {/* Booking Details */}
                  <p className="mb-1">
                    📅 <strong>Date:</strong> {b.date}
                  </p>
                  <p className="mb-1">
                    ⏰ <strong>Time:</strong> {b.time}
                  </p>
                  <p className="mb-3">
                    🏠 <strong>Address:</strong> {b.address}
                  </p>

                  {/* Action Buttons */}
                  {b.status === "pending" && (
                    <button className="btn btn-outline-danger btn-sm w-100"
                    onClick={()=>cancelBooking(b._id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>

                {/* Footer */}
                <div className="card-footer bg-transparent border-0 text-muted small text-end">
                  Booked on {new Date(b.createdAt).toLocaleDateString()}
                </div>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBooking;