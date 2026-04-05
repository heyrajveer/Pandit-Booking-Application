import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/authApi";
import "../../styles/UserDashboard.css";

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
    <div className="container-fluid p-0" style={{ marginTop: "70px" }}>
      {/* Hero Section with Bootstrap Jumbotron */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="d-flex align-items-center mb-4">
                <div className="position-relative me-4">
                  {user?.image ? (
                    <img src={user.image} alt="User Avatar" className="rounded-circle border border-4 border-white shadow" style={{ width: "80px", height: "80px", objectFit: "cover" }} />
                  ) : <img src="/default-avatar.svg" alt="Default Avatar" className="rounded-circle border border-4 border-white shadow" style={{ width: "80px", height: "80px", objectFit: "cover" }} />}
                  <span className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-3 border-white"
                        style={{ width: "20px", height: "20px" }}></span>
                </div>
                <div>
                  <h1 className="h2 mb-1 fw-bold">{user?.name || "Guest User"}</h1>
                  <p className="mb-0 opacity-75">Welcome back to your spiritual journey</p>
                </div>
              </div>

              {/* Stats Row */}
             

              {/* Action Buttons */}
              <div className="d-flex gap-3 flex-wrap">
                <button
                  className="btn btn-light btn-lg px-4 rounded-pill shadow-sm"
                  onClick={() => navigate("/user-profile")}
                >
                  <i className="fas fa-user-edit me-2"></i>Edit Profile
                </button>
                <button
                  className="btn btn-outline-light btn-lg px-4 rounded-pill"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt me-2"></i>Logout
                </button>
              </div>
            </div>

            <div className="col-lg-4 text-center mt-4 mt-lg-0">
              <div className="bg-white bg-opacity-10 rounded-4 p-4 backdrop-blur">
                <i className="fas fa-praying-hands text-white fs-1 mb-3"></i>
                <h5 className="text-white">Spiritual Journey</h5>
                <p className="text-white-50 small mb-0">Your path to divine connection</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        {/* Welcome Alert */}
        <div className="alert alert-info border-0 shadow-sm mb-5" role="alert">
          <div className="d-flex align-items-center">
            <i className="fas fa-star text-warning fs-4 me-3"></i>
            <div>
              <h5 className="alert-heading mb-1">Welcome to Pandit Booking!</h5>
              <p className="mb-0">Connect with verified pandits and experience authentic spiritual services.</p>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex align-items-center mb-4">
              <div>
                <h2 className="h3 mb-1 fw-bold text-dark">Quick Actions</h2>
                <p className="text-muted mb-0">Access your most used features</p>
              </div>
            </div>

            <div className="row g-4">
              {/* Book New Pooja Card */}
              <div className="col-lg-3 col-md-6">
                <div
                  className="card h-100 border-0 shadow-sm hover-lift"
                  onClick={() => navigate("/pandits")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body text-center p-4">
                    <div className="bg-primary bg-gradient rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
                         style={{ width: "60px", height: "60px" }}>
                      <i className="fas fa-plus-circle text-white fs-4"></i>
                    </div>
                    <h5 className="card-title fw-bold mb-2">Book New Pooja</h5>
                    <p className="card-text text-muted small mb-3">
                      Schedule religious ceremonies with verified pandits
                    </p>
                    <span className="badge bg-primary rounded-pill px-3 py-2">
                      <i className="fas fa-star me-1"></i>Popular
                    </span>
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center pb-3">
                    <button className="btn btn-primary rounded-pill px-4">
                      <i className="fas fa-arrow-right me-2"></i>Get Started
                    </button>
                  </div>
                </div>
              </div>

              {/* My Bookings Card */}
              <div className="col-lg-3 col-md-6">
                <div
                  className="card h-100 border-0 shadow-sm hover-lift"
                  onClick={() => navigate("/my-bookings")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body text-center p-4">
                    <div className="bg-success bg-gradient rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
                         style={{ width: "60px", height: "60px" }}>
                      <i className="fas fa-calendar-check text-white fs-4"></i>
                    </div>
                    <h5 className="card-title fw-bold mb-2">My Bookings</h5>
                    <p className="card-text text-muted small mb-3">
                      Track your booking history and upcoming events
                    </p>
                    <span className="badge bg-success rounded-pill px-3 py-2">
                      <i className="fas fa-clock me-1"></i>Active
                    </span>
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center pb-3">
                    <button className="btn btn-success rounded-pill px-4">
                      <i className="fas fa-list me-2"></i>View All
                    </button>
                  </div>
                </div>
              </div>

              {/* Spiritual Guidance Card */}
              <div className="col-lg-3 col-md-6">
                <div
                  className="card h-100 border-0 shadow-sm hover-lift"
                  onClick={() => navigate("/chat")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body text-center p-4">
                    <div className="bg-info bg-gradient rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
                         style={{ width: "60px", height: "60px" }}>
                      <i className="fas fa-comments text-white fs-4"></i>
                    </div>
                    <h5 className="card-title fw-bold mb-2">AI Assistant</h5>
                    <p className="card-text text-muted small mb-3">
                      Get instant spiritual guidance and answers
                    </p>
                    <span className="badge bg-info rounded-pill px-3 py-2">
                      <i className="fas fa-robot me-1"></i>24/7
                    </span>
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center pb-3">
                    <button className="btn btn-info rounded-pill px-4">
                      <i className="fas fa-comments me-2"></i>Start Chat
                    </button>
                  </div>
                </div>
              </div>

              {/* Help & Support Card */}
              <div className="col-lg-3 col-md-6">
                <div
                  className="card h-100 border-0 shadow-sm hover-lift"
                  onClick={() => navigate("/contact")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body text-center p-4">
                    <div className="bg-warning bg-gradient rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
                         style={{ width: "60px", height: "60px" }}>
                      <i className="fas fa-question-circle text-white fs-4"></i>
                    </div>
                    <h5 className="card-title fw-bold mb-2">Help & Support</h5>
                    <p className="card-text text-muted small mb-3">
                      Get assistance with bookings and guidance
                    </p>
                    <span className="badge bg-warning rounded-pill px-3 py-2">
                      <i className="fas fa-headset me-1"></i>Support
                    </span>
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center pb-3">
                    <button className="btn btn-warning rounded-pill px-4">
                      <i className="fas fa-envelope me-2"></i>Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm bg-light">
              <div className="card-body p-5 text-center">
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="d-flex flex-column align-items-center">
                      <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
                           style={{ width: "60px", height: "60px" }}>
                        <i className="fas fa-shield-alt text-white fs-4"></i>
                      </div>
                      <h6 className="fw-bold mb-2">Verified Pandits</h6>
                      <p className="text-muted small mb-0">All our pandits are thoroughly verified and experienced</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex flex-column align-items-center">
                      <div className="bg-success rounded-circle d-flex align-items-center justify-content-center mb-3"
                           style={{ width: "60px", height: "60px" }}>
                        <i className="fas fa-clock text-white fs-4"></i>
                      </div>
                      <h6 className="fw-bold mb-2">24/7 Support</h6>
                      <p className="text-muted small mb-0">Round the clock assistance for all your needs</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex flex-column align-items-center">
                      <div className="bg-info rounded-circle d-flex align-items-center justify-content-center mb-3"
                           style={{ width: "60px", height: "60px" }}>
                        <i className="fas fa-heart text-white fs-4"></i>
                      </div>
                      <h6 className="fw-bold mb-2">Authentic Services</h6>
                      <p className="text-muted small mb-0">Traditional ceremonies performed with devotion</p>
                    </div>
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

export default UserDashboard;