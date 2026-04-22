import React, { useState } from "react";
import { loginUser } from "../../api/authApi";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

function Login({ setIsLogin, from }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if this is a standalone page (not inside AuthPage)
  const isStandalone = !setIsLogin;

  // Get 'from' from query parameter or props
  const fromParam = new URLSearchParams(location.search).get('from');
  const returnTo = fromParam || from || null;

  const validateForm = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.email && !form.email.includes("@")) newErrors.email = "Invalid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await loginUser(form);
      // ✅ store user only client side ke liye store kra he from cookies
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful ✅");

      // ✅ Redirect to 'from' page if available, otherwise dashboard based on role
      if (returnTo) {
        navigate(returnTo);
      } else if (res.data.user.role === "pandit") {
        navigate("/pandit-dashboard");
      } else {
        navigate("/user-dashboard");
      }

      console.log("Login Success ✅", res.data);
    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong ❌";

      toast.error(message); // 👈 SHOW BACKEND MESSAGE
      console.log("ERROR 👉", err.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Standalone page UI (when accessed directly via /login)
  if (isStandalone) {
    return (
      <div style={{ marginTop: "70px", paddingBottom: "100px" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #fff7f2, #fff)",
            minHeight: "calc(100vh - 70px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-7">
                {/* Header */}
                <div className="text-center mb-5">
                  <h1 className="fw-bold mb-2" style={{ color: "#ff6b00", fontSize: "2.5rem" }}>
                    🔐 Login
                  </h1>
                  <p className="text-muted">Sign in to your account to continue</p>
                </div>

                {/* Form Card */}
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
                      padding: "20px",
                      color: "white"
                    }}
                  >
                    <h5 className="fw-bold mb-0">Welcome Back 👋</h5>
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    <form onSubmit={handleLogin}>
                      {/* Email */}
                      <div className="mb-4">
                        <label className="form-label fw-semibold mb-2">Email Address</label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          placeholder="📧 Enter your email"
                          value={form.email}
                          onChange={(e) => {
                            setForm({ ...form, email: e.target.value });
                            setErrors({ ...errors, email: "" });
                          }}
                          style={{
                            borderColor: errors.email ? "#dc3545" : "#dee2e6",
                            borderWidth: errors.email ? "2px" : ""
                          }}
                        />
                        {errors.email && (
                          <small className="text-danger d-block mt-2">{errors.email}</small>
                        )}
                      </div>

                      {/* Password */}
                      <div className="mb-4">
                        <label className="form-label fw-semibold mb-2">Password</label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          placeholder="🔒 Enter your password"
                          value={form.password}
                          onChange={(e) => {
                            setForm({ ...form, password: e.target.value });
                            setErrors({ ...errors, password: "" });
                          }}
                          style={{
                            borderColor: errors.password ? "#dc3545" : "#dee2e6",
                            borderWidth: errors.password ? "2px" : ""
                          }}
                        />
                        {errors.password && (
                          <small className="text-danger d-block mt-2">{errors.password}</small>
                        )}
                      </div>

                      {/* Login Button */}
                      <button
                        type="submit"
                        className="btn btn-lg w-100 fw-semibold"
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
                            Logging in...
                          </>
                        ) : (
                          "✅ Login"
                        )}
                      </button>
                    </form>

                    {/* Divider */}
                    <div className="d-flex align-items-center my-4">
                      <div style={{ flex: 1, height: "1px", background: "#ddd" }}></div>
                      <span className="px-3 text-muted small">or</span>
                      <div style={{ flex: 1, height: "1px", background: "#ddd" }}></div>
                    </div>

                    {/* Register Link */}
                    <p className="text-center text-muted small mb-0">
                      Don't have an account?{" "}
                      <a
                        href="/register"
                        style={{
                          color: "#ff6b00",
                          textDecoration: "none",
                          fontWeight: "600"
                        }}
                      >
                        Sign up here
                      </a>
                    </p>
                  </div>
                </div>

                {/* Back to Auth */}
                <div className="text-center mt-4">
                  <a
                    href="/auth"
                    style={{
                      color: "#666",
                      textDecoration: "none",
                      fontSize: "0.9rem"
                    }}
                  >
                    ← Back to Auth Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AuthPage UI (original form, used inside AuthPage)
  return (
    <form onSubmit={handleLogin}>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="📧 Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
      </div>

      <button className="btn btn-primary w-100" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default Login;