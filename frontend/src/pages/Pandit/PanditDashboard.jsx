import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logoutUser } from "../../api/authApi";
import { getMyPanditProfile } from "../../api/panditApi";

function PanditDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [pandit, setPandit] = useState(null);
  const [loading, setLoading] = useState(true);
  const profileImage = pandit?.profileImage || "https://cdn-icons-png.flaticon.com/512/4140/4140048.png";

  useEffect(() => {
    if (!user || user.role?.toLowerCase() !== "pandit") {
      navigate("/auth");
      return;
    }

    getMyPanditProfile()
      .then((res) => setPandit(res.data))
      .catch(() => setPandit(null))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("user");
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-warning"></div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "70px" }}>
      <div className="container-fluid p-0">
        <div className="row min-vh-80 g-0">

          <div className="col-md-5 d-none d-md-block position-relative" style={{ height: "82vh", overflow: "hidden" }}>
            <img
              src="../../images/panditlogo.jpg"
              alt="pandit"
              className="w-100 h-80"
              style={{ objectFit: "cover" }}
            />
            <div className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
              <h2 className="fw-bold">Professional Pandit Dashboard</h2>
              <p className="small">
                Build your profile, manage bookings and showcase your services professionally.
              </p>
            </div>
          </div>

          <div className="col-md-7 bg-light">
            <div className="container py-5">
              <div className="card border-0 shadow-sm rounded-4 mb-5">
                <div className="row g-0 align-items-center">
                  <div className="col-4 d-flex justify-content-center p-4">
                    <img
                      src={profileImage}
                      alt="profile"
                      className="rounded-circle border"
                      style={{ width: "140px", height: "140px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-8 p-4">
                    <h3 className="fw-bold mb-1">{user?.name || "Pandit"}</h3>
                    <p className="text-muted mb-2">{user?.city || "Location not set"}</p>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <span className="badge bg-primary text-white">{pandit?.services?.length || 0} Services</span>
                      <span className="badge bg-success text-white">₹{pandit?.price || "0"} avg. fee</span>
                    </div>
                    <p className="mb-0 text-secondary">
                      {pandit?.description || "Complete your profile to attract more clients."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card shadow-sm h-100 rounded-4">
                    <div className="card-body">
                      <h6 className="fw-bold text-dark mb-3">
                        <i className="bi bi-person-badge me-2"></i> Professional Profile
                      </h6>
                      {!pandit ? (
                        <>
                          <p className="text-danger small">You haven't created your profile yet.</p>
                          <button className="btn btn-primary w-100 rounded-pill" onClick={() => navigate("/pandit-profile")}>Create Profile</button>
                        </>
                      ) : (
                        <>
                          <p className="text-muted small mb-3">Your profile is live and visible to clients.</p>
                          <button className="btn btn-outline-primary w-100 rounded-pill" onClick={() => navigate("/pandit-profile")}>Edit Profile</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card shadow-sm h-100 rounded-4">
                    <div className="card-body">
                      <h6 className="fw-bold text-dark mb-3">
                        <i className="bi bi-calendar-check me-2"></i> Booking Requests
                      </h6>
                      <p className="text-muted small mb-4">Review your latest booking requests and accept new clients quickly.</p>
                      <button className="btn btn-primary w-100 rounded-pill" onClick={() => navigate("/pandit/requests")}>View Requests</button>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="card shadow-sm rounded-4">
                    <div className="card-body d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
                      <div>
                        <h5 className="fw-semibold">Grow your practice</h5>
                        <p className="text-muted mb-0">Keep your profile updated and respond fast to booking requests for higher visibility.</p>
                      </div>
                      <button className="btn btn-outline-secondary rounded-pill" onClick={() => navigate("/pandit-profile")}>Update profile</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4">
                <button className="btn btn-outline-danger rounded-pill px-4" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanditDashboard;