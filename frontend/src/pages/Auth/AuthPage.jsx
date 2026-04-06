import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser) {
      navigate(storedUser.role === "pandit" ? "/pandit-dashboard" : "/user-dashboard");
    }
  }, [navigate]);

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 position-relative"
      style={{
        backgroundImage: "url('/images/havan.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🔥 Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4))",
          zIndex: 0,
        }}
      ></div>

      <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
        <div className="row justify-content-center align-items-center gx-5">

          {/* LEFT CONTENT */}
          <div className="col-lg-5 d-none d-lg-block">
            <div className="text-white">

              <span className="badge bg-warning text-dark rounded-pill mb-3 px-3 py-2">
                🪔 Pandit Booking Studio
              </span>

              <h1 className="fw-bold mb-4">
                Book trusted pandits or join as a pandit partner.
              </h1>

              <p className="text-light mb-4">
                Users can book verified pandits for any ritual. Pandits can
                register to manage bookings, grow services, and reach new clients.
              </p>

              <ul className="list-unstyled">
                <li className="mb-3">✅ Secure login & protected data</li>
                <li className="mb-3">✅ Verified pandits & easy booking</li>
                <li>✅ Track rituals & upcoming ceremonies</li>
              </ul>

            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="col-lg-5">
            <div
              className="card shadow-lg border-0 p-4"
              style={{
                borderRadius: "20px",
                backdropFilter: "blur(12px)",
                background: "rgba(255,255,255,0.95)",
              }}
            >

              {/* HEADER */}
              <div className="text-center mb-4">

                <span className="badge bg-warning text-dark rounded-pill mb-3 px-3 py-2">
                  {isLogin ? "Login" : "Register"}
                </span>

                <h3 className="fw-bold text-dark">
                  {isLogin ? "Welcome Back 👋" : "Create Account ✨"}
                </h3>

                <p className="text-muted small">
                  {isLogin
                    ? "Login to manage bookings, rituals, or your pandit profile."
                    : "Create an account to start booking pandits or offering spiritual services."}
                </p>

              </div>

              {/* FORM */}
              {isLogin ? (
                <Login setIsLogin={setIsLogin} from={location.state?.from} />
              ) : (
                <Register setIsLogin={setIsLogin} from={location.state?.from} />
              )}

              {/* TOGGLE */}
              <div className="text-center mt-4">
                <small className="text-muted">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </small>
                <br />

                <button
                  className="btn btn-link fw-semibold text-warning"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Create Account" : "Login Instead"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AuthPage;