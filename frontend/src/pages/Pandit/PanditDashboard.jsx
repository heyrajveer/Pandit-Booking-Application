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
    try {
      await logoutUser();
      localStorage.removeItem("user");
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;


  return (
    <div style={{ marginTop: "70px" }}>
    <div
      style={{
        background: "linear-gradient(135deg, #ff9933, #ffcc80)",
        minHeight: "82vh"
      }}
    >
      {/* 🔝 Navbar Header */}
      <div className="container-fluid bg-danger py-3 px-4 d-flex justify-content-between align-items-center">
        
        <h3 className="text-white m-0">🙏 Pandit Dashboard</h3>

        {/* 👉 Right Corner Profile */}
        <div className="d-flex align-items-center">
          <span className="text-white me-2 fw-bold">{user?.name}</span>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="profile"
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              border: "2px solid white",
              background: "white"
            }}
          />
        </div>
      </div>

      {/* 🧘 Center Content */}
      <div className="container d-flex justify-content-center mt-5">
        <div
          className="card shadow-lg p-4 text-center"
          style={{
            width: "400px",
            borderRadius: "20px"
          }}
        >
          <h4 className="fw-bold text-warning mb-4">Profile</h4>

          {!pandit ? (
            <>
              <p className="text-danger">❌ Profile not created</p>
              <button
                className="btn btn-custom mb-3 w-100"
                onClick={() => navigate("/pandit-profile")}
              >
                ➕ Create Profile
              </button>
            </>
          ) : (
            <>
              <p className="text-success">✅ Profile available</p>
              <button
                className="btn btn-custom mb-3 w-100"
                onClick={() => navigate("/pandit-profile")}
              >
                👁 View / Update Profile
              </button>
            </>
          )}

          <hr />

          <h5 className="fw-bold text-warning">Bookings</h5>

          <button
            className="btn btn-custom mb-3 w-100"
            onClick={() => navigate("/pandit-bookings")}
          >
            📋 View Booking Requests
          </button>

          <hr />

          <button
            className="btn btn-danger w-100"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* 🎨 Styling */}
      <style>
        {`
          .btn-custom {
            background: linear-gradient(135deg, #ff7a18, #ffb347);
            color: white;
            border: none;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .btn-custom:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.25);
            background: linear-gradient(135deg, #ff6a00, #ff9e2c);
          }

          .card:hover {
            transform: scale(1.02);
            transition: 0.3s;
          }
        `}
      </style>
    </div>
     </div>
  );
}

export default PanditDashboard;