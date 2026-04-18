import { useEffect, useState } from "react";

import { cancelBookingApi, getMyBookings } from "../../api/bookingApi";
import { useNavigate } from "react-router-dom";
import { showConfirm, showSuccess } from "../../utils/alert";
import "../../styles/Booking.css";

function MyBooking() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication and fetch bookings
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    // Redirect to auth if not logged in
    if (!user) {
      navigate("/auth?from=/my-bookings");
      return;
    }

    setIsAuthenticated(true);

    // Fetch bookings for logged-in user
    const fetchBookings = async () => {
      try {
        const res = await getMyBookings();
        setBookings(res.data || []);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          navigate("/auth");
        } else {
          alert("Unable to fetch bookings");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  // Filter bookings based on selected filter
  // const getFilteredBookings = () => {
  //   const now = new Date();
  //   const currentMonth = now.getMonth();
  //   const currentYear = now.getFullYear();

  //   switch (filter) {
  //     case "lastMonth":
  //       return bookings.filter(booking => {
  //         const bookingDate = new Date(booking.date);
  //         const bookingMonth = bookingDate.getMonth();
  //         const bookingYear = bookingDate.getFullYear();
  //         return (bookingYear === currentYear && bookingMonth === currentMonth - 1) ||
  //                (bookingYear === currentYear - 1 && currentMonth === 0 && bookingMonth === 11);
  //       });
  //     case "lastYear":
  //       return bookings.filter(booking => {
  //         const bookingDate = new Date(booking.date);
  //         return bookingDate.getFullYear() === currentYear - 1;
  //       });
  //     default:
  //       return bookings;
  //   }
  // };
  const getFilteredBookings = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return bookings.filter((booking) => {
    const bookingDate = new Date(booking.date);
    const bookingMonth = bookingDate.getMonth();
    const bookingYear = bookingDate.getFullYear();

    switch (filter) {
      case "thisMonth":
        return bookingMonth === currentMonth && bookingYear === currentYear;

      case "lastMonth":
        return (
          (bookingYear === currentYear && bookingMonth === currentMonth - 1) ||
          (currentMonth === 0 &&
            bookingYear === currentYear - 1 &&
            bookingMonth === 11)
        );

      case "thisYear":
        return bookingYear === currentYear;

      case "lastYear":
        return bookingYear === currentYear - 1;

      default:
        return true;
    }
  });
};

  const filteredBookings = getFilteredBookings();
  const cancelBooking = async (id) => {
  try {
    // if (!window.confirm("Cancel this booking request?")) return;
    const confirm = showConfirm("Cancel this booking request?");
    if(!confirm){
      return;
    }
    

    await cancelBookingApi(id);

    showSuccess("Booking cancelled successfully ❌");

    // 🔥 refresh bookings
    const res = await getMyBookings();
    setBookings(res.data);

  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};

  // Show loading state
  if (loading) {
    return (
      <div className="container py-5" style={{ marginTop: "80px", textAlign: "center" }}>
        <h5 className="text-muted">Loading bookings...</h5>
      </div>
    );
  }

  // Protected route - user must be authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container py-5" style={{ marginTop: "80px" }}>
      
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">My Bookings</h2>
        <p className="text-muted">Track all your pandit bookings</p>
      </div>

      {/* Filter */}
      <div className="d-flex justify-content-center mb-4">
        <select
          className="form-select"
          style={{ maxWidth: "200px" }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
           <option value="all">All Bookings</option>
  <option value="lastMonth">Last Month</option>
  <option value="thisMonth">This Month</option>
  <option value="lastYear">Last Year</option>
  <option value="thisYear">This Year</option>
        </select>
      </div>

      {/* No bookings */}
      {filteredBookings.length === 0 ? (
        <div className="text-center">
          <h5 className="text-muted">
            {filter === "all" ? "No bookings found" : `No bookings found for ${filter === "lastMonth" ? "last month" : "last year"}`}
          </h5>
        </div>
      ) : (
        <div className="row g-4">
          {filteredBookings.map((b) => (
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
                  {b.poojaType && (
                    <p className="mb-1">
                      🕉️ <strong>Pooja Type:</strong> {b.poojaType}
                    </p>
                  )}
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