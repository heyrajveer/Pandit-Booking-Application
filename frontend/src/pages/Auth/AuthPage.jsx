import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{
        backgroundImage:
          "url('/images/havan.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        height:"90vh"
      }}
    >
      {/* 🔥 Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      ></div>

      {/* 🔥 Card */}
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "400px",
          borderRadius: "15px",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.9)",
          zIndex: 1,
        }}
      >
        {/* Heading */}
        <h3 className="text-center mb-3 text-primary fw-bold">
          🪔 {isLogin ? "User Login" : "Join as Pandit / User"}
        </h3>

        {/* Forms */}
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <Register setIsLogin={setIsLogin} />
        )}

        {/* Toggle */}
        <div className="text-center mt-3">
          <small>
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
          </small>
          <br />
          <button
            className="btn btn-link fw-semibold"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;