import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleSearch = () => {
    if (!city) {
      alert("Please enter city");
      return;
    }
    navigate(`/pandits?city=${city}`);
  };

  return (
    <div style={{marginTop:"50px"}}>
    <div className=" min-vh-100"
      style={{
    background: "linear-gradient(135deg, hsl(0, 0%, 100%), #74d2d7)"
  }}
    >

      {/* 🔥 HERO SECTION */}
      <div className="container py-5">
        <div className="row align-items-center">

          {/* LEFT TEXT */}
          <div className="col-md-6">
            <h1 className="fw-bold mb-3">
              Find Trusted Pandits Near You 🙏
            </h1>
            <p className="text-muted">
              Book experienced pandits for puja, havan, and religious ceremonies
              easily.
            </p>

            {/* Search */}
            <div className="d-flex mt-3">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Enter city (e.g. Delhi)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button className="btn btn-warning" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-md-6 text-center">
            <img
              src="https://img.freepik.com/premium-photo/ancient-hindu-priest-preparing-ayurvedic-medicine_731298-398.jpg"
              alt="pandit"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "350px",  objectFit: "cover" }}
            />
          </div>

        </div>
      </div>

      {/* ⭐ FEATURES */}
      <div className="container py-5">
        <h3 className="text-center fw-bold mb-4">Why Choose Us?</h3>

        <div className="row g-4">

          <div className="col-md-4">
            <div className="card shadow-sm text-center p-3">
              <h5>📿 Verified Pandits</h5>
              <p className="text-muted small">
                Only trusted and experienced pandits available.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm text-center p-3">
              <h5>⚡ Easy Booking</h5>
              <p className="text-muted small">
                Book pandits in just a few clicks.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm text-center p-3">
              <h5>💰 Affordable Prices</h5>
              <p className="text-muted small">
                Get services at reasonable prices.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 🚀 CTA */}
      <div className="py-5 text-center bg-light border-top">
  <h4 className="fw-semibold text-dark mb-2">
    Become a Pandit & Start Earning
  </h4>

  <p className="text-muted small mb-3">
    Join our platform and connect with devotees easily
  </p>

  <button
    className="btn btn-warning px-4"
    onClick={() => navigate("/auth")}
  >
    Join Now
  </button>
</div>

    </div>
    </div>
  );
}

export default Home;