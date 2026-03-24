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
      className="d-flex flex-column align-items-center"
      style={{
        background: "linear-gradient(135deg, #11445d, #80a0a8)",
        minHeight: "82vh",
        color: "white"
      }}
    >
      {/* 🔝 Welcome Section */}
      <div className="text-center mt-5">
        <h1> 👋Welcome 👋</h1>
        <h1>{user?.name}</h1>
      </div>

      {/* 🔘 Center Card */}
      <div
        className="card shadow-lg p-4 text-center mt-5"
        style={{
          width: "350px",
          borderRadius: "15px",
          backgroundColor: "white",
          color: "black"
        }}
      >
        <h5 className="mb-4">Dashboard</h5>

        <button
          className="btn btn-gradient mb-3 w-100"
          onClick={() => navigate("/user-profile")}
        >
          👤 Profile
        </button>

        <button
          className="btn btn-gradient mb-3 w-100"
          onClick={() => navigate("/pandits")}
        >
          🔍 View Pandits
        </button>

        <button
          className="btn btn-gradient mb-3 w-100"
          onClick={() => navigate("/my-bookings")}
        >
          📦 My Bookings
        </button>

        <button
          className="btn btn-danger w-100"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </div>

      {/* 🎨 Styling */}
      <style>
        {`
          .btn-gradient {
            background: linear-gradient(135deg, #4f46e5, #6366f1);
            color: white;
            border: none;
            transition: all 0.3s ease;
          }

          .btn-gradient:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
            background: linear-gradient(135deg, #4338ca, #4f46e5);
          }

          .btn-danger:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          }
        `}
      </style>
    </div>
    </div>
  );
}

export default UserDashboard;