import "./About.css";

function About() {
  return (
      <div style={{ marginTop: "70px" }}>
    <div className="about-container">
      
      <h1 className="about-title">About Us</h1>

      <p className="about-subtitle">
        We connect people with experienced and verified pandits for all types 
        of religious ceremonies and rituals. Book easily, quickly, and securely.
      </p>

      <div className="row mb-5">
        <div className="col-md-6">
          <div className="about-section">
            <h3>Our Mission</h3>
            <p>
              To simplify pandit booking and make spiritual services easily accessible.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="about-section">
            <h3>Our Vision</h3>
            <p>
              To become India's most trusted platform for religious services.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-center mb-3">What We Offer</h3>
        <ul className="service-list">
          <li>🙏 Pandit booking for pooja</li>
          <li>💍 Wedding rituals (Vivah)</li>
          <li>🏠 Griha Pravesh & Havan</li>
          <li>🔮 Astrology consultation</li>
          <li>📍 City-wise pandit search</li>
        </ul>
      </div>

      <div className="mb-5">
        <h3 className="text-center mb-3">Why Choose Us?</h3>
        <div className="row">
          <div className="col-md-4">
            <div className="feature-card">
              <h5>Verified Pandits</h5>
              <p>Experienced and trusted professionals.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card">
              <h5>Easy Booking</h5>
              <p>Simple and fast booking process.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="feature-card">
              <h5>Secure Platform</h5>
              <p>Your data and bookings are safe.</p>
            </div>
          </div>
        </div>
      </div>

      <p className="about-footer">
        © 2026 Pandit Booking App | Made with ❤️ in India
      </p>
    </div>
    </div>
  );
}

export default About;