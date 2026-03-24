import React, { useState } from "react";
import { registerUser } from "../../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate(); // ✅ FIXED

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    city: "",
    phone: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(form);

      // ✅ SUCCESS
      if (res.data.message === "User registered successfully") {
        toast.success("Registered successfully ✅");

        setTimeout(() => {
          navigate("/auth"); // 🔥 redirect to login
        }, 1000);
      }

    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong ❌";

      // ✅ USER ALREADY EXISTS
      if (message === "User already exists") {
        toast.error("User already exists ❌");

        setTimeout(() => {
          navigate("/auth"); // 🔥 redirect anyway
        }, 1000);
      } else {
        toast.error(message);
      }
    }
  };

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

      <button type="submit" className="btn btn-success w-100">
        Register
      </button>
    </form>
  );
}

export default Register;