import React, { useState } from "react";
import { loginUser } from "../../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
   const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
       // ✅ store user only client side ke liye store kra he from cookies
       localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success("Login successful ✅");
        
     // ✅ redirect based on role
      if (res.data.user.role === "pandit") {
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
    }
  };


  return (
    <form onSubmit={handleLogin}>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="📧 Email"
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
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
      </div>

      <button className="btn btn-primary w-100">
        Login
      </button>
    </form>
  );
}

export default Login;