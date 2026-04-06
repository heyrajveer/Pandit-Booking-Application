import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function BookingPage() {
  const { id } = useParams(); // 👉 panditId
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      // Redirect to auth with return URL as query parameter
      navigate(`/auth?from=/booking/${id}`);
      return;
    }
    // Only allow "user" or "admin" role to book, not "pandit"
    if (user.role === "pandit") {
      toast.error("Pandits cannot book other pandits. Please use user account.");
      navigate("/");
      return;
    }
    setIsAuthenticated(true);
    setLoading(false);
  }, [navigate, id]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [poojaType, setPoojaType] = useState("");

  const poojaOptions = [
    "Griha Pravesh",
    "Satyanarayan Pooja",
    "Wedding",
    "Havan",
    "Vivah (Wedding Rituals)",
    "Mundan (Head Shaving)",
    "Jagran (Night Vigil)",
    "Other"
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!poojaType) newErrors.poojaType = "Please select pooja type";
    if (!date) newErrors.date = "Please select a date";
    if (!time) newErrors.time = "Please select a time";
    if (!address) newErrors.address = "Please enter address";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = async () => {
    try {
      if (!validateForm()) {
        toast.error("Please fill all required fields");
        return;
      }

      setIsSubmitting(true);

      const response = await axios.post(
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

      if (response.status === 201) {
        toast.success("Booking Confirmed! ✅ You will receive updates soon.");
        navigate("/my-bookings");
      }

    } catch (err) {
      console.error(err.response?.data || err.message);
      if (err.response?.status === 401) {
        toast.error("Please login to continue");
        navigate("/auth");
      } else {
        toast.error(err.response?.data?.error || "Booking Failed ❌");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5" style={{ marginTop: "100px" }}>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ marginTop: "70px", paddingBottom: "100px" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #fff7f2, #fff)",
          minHeight: "calc(100vh - 70px)"
        }}
      >
        <div className="container py-5">
          
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="fw-bold mb-2" style={{ color: "#ff6b00", fontSize: "2.5rem" }}>
              🙏 Book Your Pandit
            </h1>
            <p className="text-muted" style={{ fontSize: "1.1rem" }}>
              Schedule a spiritual ceremony with our verified pandit
            </p>
          </div>

          <div className="row justify-content-center">
            
            {/* Main Form Card */}
            <div className="col-lg-7 col-md-10">
              <div
                className="card border-0 shadow-lg"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden"
                }}
              >
                {/* Card Header */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #ff6b00, #ff8533)",
                    padding: "30px",
                    color: "white"
                  }}
                >
                  <h4 className="fw-bold mb-0">📋 Booking Details</h4>
                  <p className="small mb-0 mt-2">Fill in all the details to confirm your booking</p>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  
                  {/* Pooja Type */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold mb-2">
                      <span style={{ color: "#ff6b00" }}>✡️</span> Pooja Type
                    </label>
                    <select
                      className="form-select form-select-lg"
                      value={poojaType}
                      onChange={(e) => {
                        setPoojaType(e.target.value);
                        setErrors({ ...errors, poojaType: "" });
                      }}
                      style={{
                        borderColor: errors.poojaType ? "#dc3545" : "#dee2e6",
                        borderWidth: errors.poojaType ? "2px" : ""
                      }}
                    >
                      <option value="">Select Pooja Type</option>
                      {poojaOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.poojaType && (
                      <small className="text-danger">{errors.poojaType}</small>
                    )}
                  </div>

                  {/* Date */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold mb-2">
                      <span style={{ color: "#ff6b00" }}>📅</span> Date
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        setErrors({ ...errors, date: "" });
                      }}
                      style={{
                        borderColor: errors.date ? "#dc3545" : "#dee2e6",
                        borderWidth: errors.date ? "2px" : ""
                      }}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.date && (
                      <small className="text-danger">{errors.date}</small>
                    )}
                  </div>

                  {/* Time */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold mb-2">
                      <span style={{ color: "#ff6b00" }}>⏰</span> Time
                    </label>
                    <input
                      type="time"
                      className="form-control form-control-lg"
                      value={time}
                      onChange={(e) => {
                        setTime(e.target.value);
                        setErrors({ ...errors, time: "" });
                      }}
                      style={{
                        borderColor: errors.time ? "#dc3545" : "#dee2e6",
                        borderWidth: errors.time ? "2px" : ""
                      }}
                    />
                    {errors.time && (
                      <small className="text-danger">{errors.time}</small>
                    )}
                  </div>

                  {/* Address */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold mb-2">
                      <span style={{ color: "#ff6b00" }}>📍</span> Location/Address
                    </label>
                    <textarea
                      className="form-control form-control-lg"
                      placeholder="Enter complete address (street, city, postal code)"
                      rows="3"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setErrors({ ...errors, address: "" });
                      }}
                      style={{
                        borderColor: errors.address ? "#dc3545" : "#dee2e6",
                        borderWidth: errors.address ? "2px" : ""
                      }}
                    />
                    {errors.address && (
                      <small className="text-danger">{errors.address}</small>
                    )}
                  </div>

                  {/* Summary */}
                  {date && time && poojaType && address && (
                    <div
                      className="alert border-0 mb-4"
                      style={{
                        background: "#fff7f2",
                        borderLeft: "4px solid #ff6b00"
                      }}
                    >
                      <small className="d-block mb-2">
                        <strong>📋 Booking Summary:</strong>
                      </small>
                      <small className="d-block">✓ {poojaType} on {date} at {time}</small>
                      <small className="d-block">✓ Location: {address.substring(0, 40)}...</small>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-lg fw-semibold"
                      onClick={handleBooking}
                      disabled={isSubmitting}
                      style={{
                        background: "linear-gradient(135deg, #ff6b00, #ff8533)",
                        color: "white",
                        border: "none",
                        transition: "0.3s"
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 10px 25px rgba(255, 107, 0, 0.3)";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Processing...
                        </>
                      ) : (
                        "✅ Confirm Booking"
                      )}
                    </button>
                    
                    <button
                      className="btn btn-outline-secondary btn-lg fw-semibold"
                      onClick={() => navigate(-1)}
                    >
                      ← Back
                    </button>
                  </div>

                </div>
              </div>

              {/* Info Box */}
              <div className="row g-3 mt-1">
                <div className="col-md-6">
                  <div
                    className="text-center p-3 rounded"
                    style={{ background: "#fff7f2" }}
                  >
                    <p className="mb-1" style={{ fontSize: "1.3rem" }}>⚡</p>
                    <small className="fw-semibold text-dark">Instant Confirmation</small>
                    <p className="small text-muted mb-0">Get updates within 24 hours</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="text-center p-3 rounded"
                    style={{ background: "#fff7f2" }}
                  >
                    <p className="mb-1" style={{ fontSize: "1.3rem" }}>🔒</p>
                    <small className="fw-semibold text-dark">Secure Payment</small>
                    <p className="small text-muted mb-0">100% safe transaction</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BookingPage;