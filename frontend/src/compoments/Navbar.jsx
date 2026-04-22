import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../api/authApi";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <nav style={navStyle}>
      {/* Top bar */}
      <div style={topBar}>
        <h4 style={{ margin: 0 }}>🛕 Pandit Booking</h4>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <NavLinks user={user} handleLogout={handleLogout} />
        </div>

        {/* Hamburger (mobile only) */}
        <div
          className="mobile-menu-btn"
          onClick={() => setOpen(!open)}
        >
          ☰
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        style={{
          maxHeight: open ? "350px" : "0px",
          overflow: "hidden",
          transition: "0.3s ease",
          background: "#3da4ab",
        }}
        className="mobile-dropdown"
      >
        <div style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
          <NavLinks user={user} handleLogout={handleLogout} setOpen={setOpen} />
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .desktop-menu {
          display: none;
        }

        .mobile-menu-btn {
          font-size: 24px;
          cursor: pointer;
        }

        @media (min-width: 768px) {
          .desktop-menu {
            display: flex;
            gap: 20px;
            align-items: center;
          }

          .mobile-menu-btn {
            display: none;
          }

          .mobile-dropdown {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}

// Reusable Links
function NavLinks({ user, handleLogout, setOpen }) {
  const close = () => setOpen && setOpen(false);

  return (
    <>
      <CustomLink to="/" close={close}>Home</CustomLink>
      <CustomLink to="/about" close={close}>About</CustomLink>
      <CustomLink to="/contact" close={close}>Contact</CustomLink>
      <CustomLink to="/chat" close={close}>💬 Chat</CustomLink>

      {!user ? (
        <CustomLink to="/auth" close={close}>Login</CustomLink>
      ) : (
        <>
          <CustomLink
            to={user.role === "pandit" ? "/pandit-dashboard" : "/user-dashboard"}
            close={close}
          >
            Dashboard
          </CustomLink>

          <button onClick={handleLogout} style={logoutBtn}>
            Logout
          </button>
        </>
      )}
    </>
  );
}

// Link
function CustomLink({ to, children, close }) {
  return (
    <Link
      to={to}
      onClick={close}
      style={linkStyle}
      onMouseEnter={(e) => (e.target.style.color = "#4a1abb")}
      onMouseLeave={(e) => (e.target.style.color = "white")}
    >
      {children}
    </Link>
  );
}

// Styles
const navStyle = {
  position: "fixed",
  top: 0,
  width: "100%",
  background: "#24dfdf",
  color: "white",
  zIndex: 1000,
};

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 20px",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "10px",
};

const logoutBtn = {
  padding: "6px 10px",
  background: "#e93b3b",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Navbar;