import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { showError, showSuccess } from "../../utils/alert";

function Login({ setIsLogin, from }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isStandalone = !setIsLogin;
  const fromParam = new URLSearchParams(location.search).get("from");
  const returnTo = fromParam || from || null;

  const validateForm = () => {
    const newErrors = {};

    if (!form.email) newErrors.email = "Email is required";
    if (form.email && !form.email.includes("@")) newErrors.email = "Invalid email";
    if (!form.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showError("Please fix the errors");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      await showSuccess("Login successful");

      if (returnTo) {
        navigate(returnTo);
      } else if (res.data.user.role === "pandit") {
        navigate("/pandit-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      showError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            padding: "20px",
          }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-7">
                <div className="text-center mb-5">
                  <h1
                    className="fw-bold mb-2"
                    style={{ color: "#ff6b00", fontSize: "2.5rem" }}
                  >
                    Login
                  </h1>
                  <p className="text-muted">Sign in to your account to continue</p>
                </div>

                <div
                  className="card border-0 shadow-lg"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      background: "linear-gradient(135deg, #ff6b00, #ff8533)",
                      padding: "20px",
                      color: "white",
                    }}
                  >
                    <h5 className="fw-bold mb-0">Welcome Back</h5>
                  </div>

                  <div className="p-4">
                    <form onSubmit={handleLogin}>
                      <div className="mb-4">
                        <label className="form-label fw-semibold mb-2">Email Address</label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          placeholder="Enter your email"
                          value={form.email}
                          onChange={(e) => {
                            setForm({ ...form, email: e.target.value });
                            setErrors({ ...errors, email: "" });
                          }}
                          style={{
                            borderColor: errors.email ? "#dc3545" : "#dee2e6",
                            borderWidth: errors.email ? "2px" : "",
                          }}
                        />
                        {errors.email && (
                          <small className="text-danger d-block mt-2">{errors.email}</small>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold mb-2">Password</label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          placeholder="Enter your password"
                          value={form.password}
                          onChange={(e) => {
                            setForm({ ...form, password: e.target.value });
                            setErrors({ ...errors, password: "" });
                          }}
                          style={{
                            borderColor: errors.password ? "#dc3545" : "#dee2e6",
                            borderWidth: errors.password ? "2px" : "",
                          }}
                        />
                        {errors.password && (
                          <small className="text-danger d-block mt-2">{errors.password}</small>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="btn btn-lg w-100 fw-semibold"
                        disabled={isSubmitting}
                        style={{
                          background: "linear-gradient(135deg, #ff6b00, #ff8533)",
                          color: "white",
                          border: "none",
                          transition: "0.3s",
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
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Logging in...
                          </>
                        ) : (
                          "Login"
                        )}
                      </button>
                    </form>

                    <div className="d-flex align-items-center my-4">
                      <div style={{ flex: 1, height: "1px", background: "#ddd" }}></div>
                      <span className="px-3 text-muted small">or</span>
                      <div style={{ flex: 1, height: "1px", background: "#ddd" }}></div>
                    </div>

                    <p className="text-center text-muted small mb-0">
                      Don't have an account?{" "}
                      <a
                        href="/register"
                        style={{
                          color: "#ff6b00",
                          textDecoration: "none",
                          fontWeight: "600",
                        }}
                      >
                        Sign up here
                      </a>
                    </p>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <a
                    href="/auth"
                    style={{
                      color: "#666",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                    }}
                  >
                    Back to Auth Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <button className="btn btn-primary w-100" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default Login;
