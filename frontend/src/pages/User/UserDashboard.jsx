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
    <div style={{ marginTop: "70px" }}>
      <div
        className="position-relative"
        style={{ minHeight: "82vh", background: "#edf7fb" }}
      >
        <div
          className="position-absolute top-0 start-0 w-100"
          style={{
            height: "260px",
            background: "linear-gradient(135deg, #1f497c, #4f8fc7)",
            borderBottomLeftRadius: "35px",
            borderBottomRightRadius: "35px",
            zIndex: 0,
          }}
        ></div>

        <div className="container py-5" style={{ position: "relative", zIndex: 1 }}>
          <div
            className="card shadow-lg mb-4 p-4 text-white"
            style={{ background: "rgba(18, 78, 143, 0.95)" }}
          >
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                    alt="user"
                    className="rounded-circle"
                    width="80"
                  />
                  <div>
                    <h2 className="mb-1">{user?.name || "Guest"}</h2>
                    <p className="mb-1 text-white-50">
                      {user?.profession || "Community Member"}
                    </p>
                    <p className="mb-0">
                      Welcome back! Manage your bookings and discover verified pandits.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <span className="badge bg-light text-dark py-2 px-3 fs-6">
                  Member since {new Date(user?.createdAt || Date.now()).getFullYear()}
                </span>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm h-100 text-center p-4 border-0" style={{ borderRadius: "22px" }}>
                <div
                  className="bg-light rounded-4 mx-auto mb-3"
                  style={{ width: "80px", height: "80px", display: "grid", placeItems: "center" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
                    alt="profile"
                    width="38"
                  />
                </div>
                <h5 className="fw-semibold">My Profile</h5>
                <p className="text-muted small">
                  View and update your personal details
                </p>
                <button
                  className="btn btn-primary rounded-pill px-4"
                  onClick={() => navigate("/user-profile")}
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm h-100 text-center p-4 border-0" style={{ borderRadius: "22px" }}>
                <div
                  className="bg-light rounded-4 mx-auto mb-3"
                  style={{ width: "80px", height: "80px", display: "grid", placeItems: "center" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
                    alt="pandit"
                    width="38"
                  />
                </div>
                <h5 className="fw-semibold">Find Pandits</h5>
                <p className="text-muted small">
                  Browse and book verified pandits quickly
                </p>
                <button
                  className="btn btn-primary rounded-pill px-4"
                  onClick={() => navigate("/pandits")}
                >
                  Search Now
                </button>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm h-100 text-center p-4 border-0" style={{ borderRadius: "22px" }}>
                <div
                  className="bg-light rounded-4 mx-auto mb-3"
                  style={{ width: "80px", height: "80px", display: "grid", placeItems: "center" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                    alt="booking"
                    width="38"
                  />
                </div>
                <h5 className="fw-semibold">My Bookings</h5>
                <p className="text-muted small">
                  Track your past and upcoming bookings
                </p>
                <button
                  className="btn btn-primary rounded-pill px-4"
                  onClick={() => navigate("/my-bookings")}
                >
                  View Bookings
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 p-4 rounded-4 shadow-sm bg-white">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h5 className="fw-semibold">Need Help?</h5>
                <p className="text-muted mb-0">
                  Our platform helps you connect with trusted pandits easily and professionally.
                </p>
              </div>
              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => navigate('/contact')}>Contact Support</button>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              className="btn btn-outline-danger rounded-pill px-4"
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