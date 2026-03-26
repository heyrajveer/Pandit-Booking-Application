import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/authApi";

function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("user");
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
  };

return (
  <div style={{marginTop:"70px",
  
  }}>
  <div className=" 0"
   style={{ minHeight: "82vh",
    background:"rgb(203, 231, 235)"
    }}>

    {/* 🔥 Content */}
    <div className="container py-5" style={{background:"rgba(151, 230, 228, 0.62)"}}>

      {/* 👤 Profile Section */}
      <div className="card shadow-sm mb-4 p-4"
      style={{background:"linear-gradient(to right, #38a1bb, #6dd5ed)"}}
      >
        <div className="d-flex align-items-center">

          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="user"
            className="rounded-circle me-3"
            width="70"
          />

          <div>
            <h3 className="mb-1">{user?.name.toUpperCase()}</h3>
            <p className="text-muted small mb-0">
             <h4> Welcome back! Manage your bookings and explore pandits easily.</h4>
            </p>
          </div>
        </div>
      </div>

      {/* 🔲 Cards */}
      <div className="row g-4">

        {/* Profile */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 text-center p-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
              alt="profile"
              width="60"
              className="mx-auto mb-2"
            />
            <h5>Profile</h5>
            <p className="text-muted small">
              View and update your personal details
            </p>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/user-profile")}
            >
              Go to Profile
            </button>
          </div>
        </div>

        {/* Pandits */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 text-center p-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
              alt="pandit"
              width="60"
              className="mx-auto mb-2"
            />
            <h5>Find Pandits</h5>
            <p className="text-muted small">
              Browse and book verified pandits
            </p>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/pandits")}
            >
              View Pandits
            </button>
          </div>
        </div>

        {/* Bookings */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100 text-center p-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
              alt="booking"
              width="60"
              className="mx-auto mb-2"
            />
            <h5>My Bookings</h5>
            <p className="text-muted small">
              Track your past and upcoming bookings
            </p>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/my-bookings")}
            >
              View Bookings
            </button>
          </div>
        </div>

      </div>

      {/* 🚀 Extra Section (Professional Touch) */}
      <div className="mt-5 text-center">
        <h5 className="fw-semibold">Need Help?</h5>
        <p className="text-muted small">
          Our platform helps you connect with trusted pandits easily and quickly.
        </p>
      </div>

      {/* Logout */}
      <div className="text-center mt-3">
        <button
          className="btn btn-danger px-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

    </div>
  </div>
  </div>
);
}

export default UserDashboard;