import { useEffect, useState } from "react";
import axios from "axios";

function PanditRequest() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/booking/my-bookings",
        { withCredentials: true }
      );
      console.log(res.data);
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ Accept / Reject
  const handleStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/booking/${id}/status`,
        { status },
        { withCredentials: true }
      );

      fetchBookings(); // refresh data
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-5" style={{ marginTop: "80px" }}>
      <h2 className="text-center mb-4">Booking Requests</h2>

      {bookings.length === 0 ? (
        <p className="text-center">No requests found</p>
      ) : (
        <div className="row g-4">
          {bookings.map((b) => (
            <div key={b._id} className="col-md-6 col-lg-4">
              <div className="card shadow border-0 p-3 rounded-4">

                {/* User Info */}
                <h5>{b.userId?.name}</h5>
                <p className="text-muted">{b.userId?.email}</p>

                <hr />

                {/* Booking Info */}
                <p>📅 {b.date}</p>
                <p>⏰ {b.time}</p>
                <p>🏠 {b.address}</p>

                {/* Status */}
                <p>
                  Status:{" "}
                  <span
                    className={`badge ${
                      b.status === "confirmed"
                        ? "bg-success"
                        : b.status === "cancelled"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {b.status}
                  </span>
                </p>

                {/* Buttons */}
                {b.status === "pending" && (
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success w-100"
                      onClick={() => handleStatus(b._id, "confirmed")}
                    >
                      Accept
                    </button>

                    <button
                      className="btn btn-danger w-100"
                      onClick={() => handleStatus(b._id, "cancelled")}
                    >
                      Reject
                    </button>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PanditRequest;