import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
   <nav
  className="d-flex justify-content-between align-items-center px-3"
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "76px",
    background: "#ffffff",
    borderBottom: "1px solid #ddd",
    zIndex: 1000
  }}
>
  <h4 className="m-0 fw-bold">🛕 Pandit Booking</h4>

  <div>
     <Link className="me-3 text-decoration-none" to="/">Home</Link>
     <Link className="me-3 text-decoration-none" to="/about">About</Link>
     <Link className="me-3 text-decoration-none" to="/contact">Contact</Link>
    {!user ? (
      <>
        <Link className="me-3 text-decoration-none" to="/auth">
          Login
        </Link>
      </>
    ) : (
      <>
        {user.role === "pandit" ? (
          <Link className="me-3 text-decoration-none" to="/pandit-dashboard">
            Dashboard
          </Link>
        ) : (
          <Link className="me-3 text-decoration-none" to="/user-dashboard">
            Dashboard
          </Link>
        )}


        <button className="btn btn-sm btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </>
    )}
   
  </div>
</nav>
  );
}

export default Navbar;