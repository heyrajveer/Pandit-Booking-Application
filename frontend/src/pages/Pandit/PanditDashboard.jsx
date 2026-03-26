import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logoutUser } from "../../api/authApi";
import { getMyPanditProfile } from "../../api/panditApi";

function PanditDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [pandit, setPandit] = useState(null);
  const [loading, setLoading] = useState(true);

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
  <div style={{marginTop:"70px"}}>
  <div className="container-fluid p-0">
    <div className="row min-vh-80 g-0">

      {/* 🔶 LEFT SIDE */}
      <div className="col-md-5 d-none d-md-block position-relative"
        style={{
    height: "82vh",
    overflow: "hidden"
  }}
      >
        <img
          src="../../images/panditlogo.jpg"
          alt="pandit"
          className="w-100 h-80"
          style={{ objectFit: "cover"  }}
        />

        {/* Content */}
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
          <h2 className="fw-bold">🙏 Welcome Pandit Ji</h2>
          <p className="small">
            Manage your profile, bookings and grow your services with ease.
          </p>
        </div>
      </div>

      {/* 🔷 RIGHT SIDE */}
      <div className="col-md-7 bg-light">

        {/* Navbar */}
        <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-white shadow-sm">
          <h5 className="fw-bold m-0">Dashboard</h5>

          <div className="d-flex align-items-center">
            <span className="me-2 fw-semibold">{user?.name}</span>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
              alt="profile"
              className="rounded-circle border"
              width="40"
            />
          </div>
        </div>

        {/* Welcome */}
        <div className="container py-4">
          <h4 className="fw-bold mb-1">Hello, {user?.name} 👋</h4>
          <p className="text-muted mb-4">
            Here’s what you can manage today
          </p>

          <div className="row g-4">

            {/* Profile Card */}
            <div className="col-md-5">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h6 className="fw-bold text-warning mb-3">
                    <i className="bi bi-person me-2"></i> Profile
                  </h6>

                  {!pandit ? (
                    <>
                      <p className="text-danger small">Profile not created</p>
                      <button
                        className="btn btn-warning w-100"
                        onClick={() => navigate("/pandit-profile")}
                      >
                        Create Profile
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-success small">Profile available</p>
                      <button
                        className="btn btn-warning w-100"
                        onClick={() => navigate("/pandit-profile")}
                      >
                        View / Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="col-md-5">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h6 className="fw-bold text-warning mb-3">
                    <i className="bi bi-calendar-check me-2"></i> Bookings
                  </h6>

                  <p className="text-muted small">
                    Check and manage booking requests
                  </p>

                  <button
                    className="btn btn-warning w-100"
                    onClick={() => navigate("/pandit/requests")}
                  >
                    View Bookings
                  </button>
                </div>
              </div>
            </div>

            {/* Logout */}
            {/* <div className="col-12">
              <button
                className="btn btn-danger w-50"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div> */}

          </div>
        </div>

      </div>
    </div>
  </div>
  </div>
);
}

export default PanditDashboard;