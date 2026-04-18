import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import {
  panditBookingRequests,
  updateBookingStatus
} from "../../api/bookingApi";
import "../../styles/Booking.css";

function PanditRequest() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchBookings = async () => {
      try {
        const res = await panditBookingRequests();
        // console.log(res.data);
        setBookings(res.data);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          navigate("/auth");
        } else {
          alert("Unable to fetch booking requests");
        }
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    // Check if user is logged in and is a pandit
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
      navigate("/auth?from=/pandit/requests");
      return;
    }

    if (user.role !== "pandit") {
      alert("Only pandits can access booking requests");
      navigate("/");
      return;
    }

    setIsAuthenticated(true);

    

    fetchBookings();
    //ye humse isliye use kra he taki pandit ko real time me apne booking request dikhe without refresh krne ke liye
    const interval = setInterval(() => {
    fetchBookings();
  }, 5000); // every 5 sec

  return () => clearInterval(interval);
  }, [navigate]);

  // ✅ Accept / Reject
  const handleStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status);

      fetchBookings(); // refresh data
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-5" style={{ marginTop: "80px" }}>
      {/* Loading state */}
      {loading && (
        <div className="text-center">
          <h5 className="text-muted">Loading booking requests...</h5>
        </div>
      )}

      {/* Protected route check */}
      {!loading && !isAuthenticated && (
        <div className="text-center">
          <h5 className="text-muted">Redirecting...</h5>
        </div>
      )}

      {/* Main content - only show if authenticated and not loading */}
      {!loading && isAuthenticated && (
        <>
      <div className="text-center mb-5">
        <h2 className="fw-bold">Booking Requests 📋</h2>
        <p className="text-muted">Manage your incoming booking requests from users</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center">
          <h5 className="text-muted">No booking requests found</h5>
        </div>
      ) : (
        <div className="row g-4">
          {bookings.map((b) => (
            <div key={b._id} className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-lg h-100 rounded-4 booking-card">

                {/* Card Header */}
                <div className="card-header bg-transparent border-0 pb-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="fw-semibold mb-1">{b.userId?.name}</h5>
                      <small className="text-muted">{b.userId?.email}</small>
                    </div>
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
                </div>

                {/* Card Body */}
                <div className="card-body">
                  {/* Pooja Type */}
                  {b.poojaType && (
                    <div className="mb-3">
                      <span className="badge bg-primary px-3 py-2">
                        🕉️ {b.poojaType}
                      </span>
                    </div>
                  )}

                  {/* Booking Details */}
                  <div className="booking-details">
                    <p className="mb-2">
                      <i className="fas fa-calendar-alt me-2 text-primary"></i>
                      <strong>Date:</strong> {b.date}
                    </p>
                    <p className="mb-2">
                      <i className="fas fa-clock me-2 text-primary"></i>
                      <strong>Time:</strong> {b.time}
                    </p>
                    <p className="mb-3">
                      <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                      <strong>Location:</strong> {b.address}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {b.status === "pending" && (
                    <div className="d-flex gap-2 mt-3">
                      <button
                        className="btn btn-success flex-fill"
                        onClick={() => handleStatus(b._id, "confirmed")}
                      >
                        <i className="fas fa-check me-1"></i>Accept
                      </button>
                      <button
                        className="btn btn-outline-danger flex-fill"
                        onClick={() => handleStatus(b._id, "cancelled")}
                      >
                        <i className="fas fa-times me-1"></i>Reject
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="card-footer bg-transparent border-0 text-muted small text-end">
                  Requested on {new Date(b.createdAt).toLocaleDateString()}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
      </>
      )}
    </div>
  );
}

export default PanditRequest;