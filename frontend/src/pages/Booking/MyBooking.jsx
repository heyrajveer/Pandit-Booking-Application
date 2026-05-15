import { useEffect, useState } from "react";

import { cancelBookingApi, getMyBookings, updateBookingDetails } from "../../api/bookingApi";
import { createReview, updateReview, getBookingReview } from "../../api/reviewApi";
import { useNavigate } from "react-router-dom";
import { showConfirm, showError, showSuccess } from "../../utils/alert";
import "../../styles/Booking.css";

function MyBooking() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [editAddress, setEditAddress] = useState("");
  const [editPoojaType, setEditPoojaType] = useState("");
  const [reviewingBooking, setReviewingBooking] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [existingReview, setExistingReview] = useState(null);
  const REVIEW_DRAFT_KEY = "bookingReviewDraft";

  // Restore review draft if user navigated away and returned
  useEffect(() => {
    const savedDraft = localStorage.getItem(REVIEW_DRAFT_KEY);
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        if (draft.bookingId) {
          setReviewingBooking(draft.bookingId);
          setReviewRating(draft.rating ?? 5);
          setReviewText(draft.review ?? "");
          setExistingReview(draft.existingReview ?? null);
        }
      } catch (error) {
        localStorage.removeItem(REVIEW_DRAFT_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (!reviewingBooking) {
      localStorage.removeItem(REVIEW_DRAFT_KEY);
      return;
    }

    localStorage.setItem(
      REVIEW_DRAFT_KEY,
      JSON.stringify({
        bookingId: reviewingBooking,
        rating: reviewRating,
        review: reviewText,
        existingReview,
      })
    );
  }, [reviewingBooking, reviewRating, reviewText, existingReview]);

  // Check authentication and fetch bookings
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
    
  //   // Redirect to auth if not logged in
  //   if (!user) {
  //     navigate("/auth?from=/my-bookings");
  //     return;
  //   }

  //   setIsAuthenticated(true);

  //   // Fetch bookings for logged-in user
  //   const fetchBookings = async () => {
  //     try {
  //       const res = await getMyBookings();
  //       setBookings(res.data || []);
  //     } catch (err) {
  //       console.error(err);
  //       if (err.response?.status === 401) {
  //         navigate("/auth");
  //       } else {
  //         showError("Unable to fetch bookings");
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBookings();
  // }, [navigate]);
useEffect(() => {

   const user = JSON.parse(localStorage.getItem("user"));

   if (!user) {
      navigate("/auth?from=/my-bookings");
      return;
   }

   setIsAuthenticated(true);

   const fetchBookings = async () => {
      try {

         const res = await getMyBookings();

         setBookings(res.data || []);

      } catch (err) {

         console.error(err);

      } finally {

         setLoading(false);

      }
   };

   // Initial fetch
   fetchBookings();

   // Poll every 3 sec
   const interval = setInterval(() => {

      fetchBookings();

   }, 3000);

   return () => clearInterval(interval);

}, [navigate]);
  useEffect(() => {
    if (!reviewingBooking || existingReview) return;

    const loadReview = async () => {
      try {
        const res = await getBookingReview(reviewingBooking);
        if (res.data.review) {
          setExistingReview(res.data.review);
          setReviewRating(res.data.review.rating);
          setReviewText(res.data.review.review || "");
        }
      } catch (err) {
        // ignore missing review draft
      }
    };

    loadReview();
  }, [reviewingBooking, existingReview]);

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

  const startEditing = (booking) => {
    setEditingBooking(booking._id);
    setEditAddress(booking.address);
    setEditPoojaType(booking.poojaType || "");
  };

  const cancelEditing = () => {
    setEditingBooking(null);
    setEditAddress("");
    setEditPoojaType("");
  };

  const saveEditing = async () => {
    try {
      await updateBookingDetails(editingBooking, {
        address: editAddress,
        poojaType: editPoojaType,
      });
      showSuccess("Booking updated successfully ✅");
      // Refresh bookings
      const res = await getMyBookings();
      setBookings(res.data);
      cancelEditing();
    } catch (err) {
      console.error(err.response?.data || err.message);
      showError("Failed to update booking");
    }
  };

  const startReviewing = async (booking) => {
    setReviewingBooking(booking._id);
    setReviewRating(5);
    setReviewText("");
    setExistingReview(null);

    try {
      const res = await getBookingReview(booking._id);
      if (res.data.review) {
        setExistingReview(res.data.review);
        setReviewRating(res.data.review.rating);
        setReviewText(res.data.review.review);
      }
    } catch (err) {
      // No existing review, that's fine
    }
  };

  const cancelReviewing = () => {
    setReviewingBooking(null);
    setReviewRating(5);
    setReviewText("");
    setExistingReview(null);
  };

  const submitReview = async () => {
    try {
      const booking = bookings.find(b => b._id === reviewingBooking);
      
      if (!booking) {
        showError("Booking not found");
        return;
      }
      
      // Handle panditId - it could be a string or an object with _id
      const panditId = typeof booking.panditId === 'string' 
        ? booking.panditId 
        : booking.panditId?._id;
      
      if (!panditId) {
        console.error("Pandit ID not found. Booking structure:", booking);
        alert("Error: Unable to identify pandit");
        return;
      }
      
      const data = {
        bookingId: reviewingBooking,
        panditId: panditId,
        rating: reviewRating,
        review: reviewText
      };

      if (existingReview) {
        // Update existing review
        await updateReview(existingReview._id, { rating: reviewRating, review: reviewText });
        showSuccess("Review updated successfully ⭐");
      } else {
        // Create new review
        console.log("Creating review with data:", data);
        await createReview(data);
        showSuccess("Review submitted successfully ⭐");
      }

      // Refresh bookings
      const res = await getMyBookings();
      setBookings(res.data);
      cancelReviewing();
    } catch (err) {
      console.error(err.response?.data || err.message);
      showError("Failed to submit review");
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
                          : b.status === "completed"
                          ? "bg-info"
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
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-primary btn-sm flex-fill"
                        onClick={() => startEditing(b)}
                      >
                        Edit
                      </button>
                      <button className="btn btn-outline-danger btn-sm flex-fill"
                        onClick={() => cancelBooking(b._id)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  {b.status === "completed" && (
                    <button className="btn btn-outline-success btn-sm w-100"
                      onClick={() => startReviewing(b)}
                    >
                      Rate & Review
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

      {/* Edit Modal */}
      {editingBooking && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Booking</h5>
                <button type="button" className="btn-close" onClick={cancelEditing}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Pooja Type</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editPoojaType}
                    onChange={(e) => setEditPoojaType(e.target.value)}
                    placeholder="e.g., Satyanarayan Pooja"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    placeholder="Enter your address"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelEditing}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={saveEditing}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewingBooking && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {existingReview ? "Update Review" : "Rate & Review"}
                </h5>
                <button type="button" className="btn-close" onClick={cancelReviewing}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <select
                    className="form-select"
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 stars)</option>
                    <option value={3}>⭐⭐⭐ (3 stars)</option>
                    <option value={2}>⭐⭐ (2 stars)</option>
                    <option value={1}>⭐ (1 star)</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Review (Optional)</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with this pandit..."
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelReviewing}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={submitReview}>
                  {existingReview ? "Update Review" : "Submit Review"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBooking;