import React, { useState } from "react";
import { registerUser } from "../../api/authApi";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

function Register({ setIsLogin, from }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    city: "",
    phone: "",
  });
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
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (form.email && !form.email.includes("@")) newErrors.email = "Invalid email";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password && form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!form.city) newErrors.city = "City is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await registerUser(form);

      if (res.data.message === "User registered successfully") {
        toast.success("Registered successfully ✅");

        if (isStandalone) {
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          setTimeout(() => {
            setIsLogin(true); // 🔥 switch to login
          }, 1000);
        }
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong ❌";

      if (message === "User already exists") {
        toast.error("User already exists ❌");

        if (!isStandalone && setIsLogin) {
          setTimeout(() => {
            setIsLogin(true); // 🔥 switch to login
          }, 1000);
        }
      } else {
        toast.error(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Standalone page UI (when accessed directly via /register)
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
                    ✨ Create Account
                  </h1>
                  <p className="text-muted">Join us to start booking or offering spiritual services</p>
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
                    <h5 className="fw-bold mb-0">Get Started 🚀</h5>
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    <form onSubmit={handleRegister}>
                      {/* Name */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold mb-2">Full Name</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="👤 Enter your name"
                          value={form.name}
                          onChange={(e) => {
                            setForm({ ...form, name: e.target.value });
                            setErrors({ ...errors, name: "" });
                          }}
                          style={{
                            borderColor: errors.name ? "#dc3545" : "#dee2e6",
                            borderWidth: errors.name ? "2px" : ""
                          }}
                        />
                        {errors.name && <small className="text-danger d-block mt-1">{errors.name}</small>}
                      </div>

                      {/* Email */}
                      <div className="mb-3">
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
                        {errors.email && <small className="text-danger d-block mt-1">{errors.email}</small>}
                      </div>

                      {/* Password */}
                      <div className="mb-3">
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
                        {errors.password && <small className="text-danger d-block mt-1">{errors.password}</small>}
                      </div>

                      {/* City */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold mb-2">City</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="🏙️ Enter your city"
                          value={form.city}
                          onChange={(e) => {
                            setForm({ ...form, city: e.target.value });
                            setErrors({ ...errors, city: "" });
                          }}
                          style={{
                            borderColor: errors.city ? "#dc3545" : "#dee2e6",
                            borderWidth: errors.city ? "2px" : ""
                          }}
                        />
                        {errors.city && <small className="text-danger d-block mt-1">{errors.city}</small>}
                      </div>

                      {/* Phone */}
                      <div className="mb-3">
                        <label className="form-label fw-semibold mb-2">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control form-control-lg"
                          placeholder="📱 Enter your phone"
                          value={form.phone}
                          onChange={(e) => {
                            setForm({ ...form, phone: e.target.value });
                            setErrors({ ...errors, phone: "" });
                          }}
                          style={{
                            borderColor: errors.phone ? "#dc3545" : "#dee2e6",
                            borderWidth: errors.phone ? "2px" : ""
                          }}
                        />
                        {errors.phone && <small className="text-danger d-block mt-1">{errors.phone}</small>}
                      </div>

                      {/* Role */}
                      <div className="mb-4">
                        <label className="form-label fw-semibold mb-2">Select Role</label>
                        <select
                          className="form-select form-select-lg"
                          value={form.role}
                          onChange={(e) =>
                            setForm({ ...form, role: e.target.value })
                          }
                        >
                          <option value="user">🙏 User (Book Pandits)</option>
                          <option value="pandit">🧘 Pandit (Offer Services)</option>
                        </select>
                      </div>

                      {/* Register Button */}
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
                            Creating account...
                          </>
                        ) : (
                          "✅ Create Account"
                        )}
                      </button>
                    </form>

                    {/* Divider */}
                    <div className="d-flex align-items-center my-4">
                      <div style={{ flex: 1, height: "1px", background: "#ddd" }}></div>
                      <span className="px-3 text-muted small">or</span>
                      <div style={{ flex: 1, height: "1px", background: "#ddd" }}></div>
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-muted small mb-0">
                      Already have an account?{" "}
                      <a
                        href="/login"
                        style={{
                          color: "#ff6b00",
                          textDecoration: "none",
                          fontWeight: "600"
                        }}
                      >
                        Login here
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
    <form onSubmit={handleRegister}>
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
      </div>

      <div className="mb-2">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
      </div>

      <div className="mb-2">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
      </div>

      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="City"
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
        />
      </div>

      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Phone"
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label>Select Role</label>
        <select
          className="form-select"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="user">🙏 User</option>
          <option value="pandit">🧘 Pandit</option>
        </select>
      </div>

      <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Register"}
      </button>
    </form>
  );
}

export default Register;