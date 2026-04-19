import "./About.css";

function About() {
  return (
    <div style={{ marginTop: "70px" }}>
      <div className="about-container">

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="about-title">About Pandit Booking</h1>
            <p className="about-subtitle">
              Connecting Devotees with Sacred Traditions. We bridge the gap between spiritual seekers
              and experienced pandits, making religious ceremonies accessible, authentic, and memorable
              for everyone across India.
            </p>
          </div>
          <div className="hero-image">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/040/722/524/small_2x/ai-generated-hindu-priest-conducts-traditional-fire-ritual-in-openair-temple-amidst-colorful-garlands-and-flickering-flames-free-photo.jpg"
              alt="Spiritual ceremony"
            />
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="stats-dashboard">
          <h2 className="section-title">Our Impact in Numbers</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Happy Families Served</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">200+</div>
              <div className="stat-label">Verified Pandits</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Cities Covered</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4.8★</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="story-section">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              Founded in 2026, Pandit Booking emerged from a simple observation: in our fast-paced modern world,
              maintaining spiritual traditions shouldn't be complicated. We recognized that many families struggle
              to find trustworthy pandits for important ceremonies, often relying on word-of-mouth or taking
              unnecessary risks.
            </p>
            <p>
              Our founders, with deep roots in Indian culture and experience in technology, decided to create
              a platform that combines the authenticity of traditional spiritual services with the convenience
              of modern digital solutions. Every pandit on our platform undergoes rigorous verification,
              ensuring they meet our standards of expertise, conduct, and service quality.
            </p>
          </div>
          <div className="story-image">
            <img
              src="https://img.freepik.com/premium-photo/monk-sitting-temple-with-blurred-background-people-candles_927877-549.jpg"
              alt="Traditional ceremony"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="row mb-5">
          <div className="col-md-6">
            <div className="about-section">
              <h3>🎯 Our Mission</h3>
              <p>
                To democratize access to authentic spiritual services by connecting devotees with verified,
                experienced pandits through a seamless digital platform. We strive to preserve and promote
                India's rich spiritual heritage while making it accessible to everyone, regardless of location
                or background.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="about-section">
              <h3>🔮 Our Vision</h3>
              <p>
                To become India's most trusted and comprehensive spiritual services platform, setting the
                gold standard for digital spiritual solutions. We envision a future where technology enhances
                rather than replaces traditional spiritual practices, creating harmony between ancient wisdom
                and modern convenience.
              </p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="services-section">
          <h2 className="section-title">Comprehensive Spiritual Services</h2>
          <div className="services-grid">
            <div className="service-item">
              <div className="service-icon">🙏</div>
              <h4>Puja & Havan</h4>
              <p>Traditional worship ceremonies and fire rituals for various occasions</p>
            </div>
            <div className="service-item">
              <div className="service-icon">💍</div>
              <h4>Wedding Rituals</h4>
              <p>Complete wedding ceremonies including Vivah Sanskar and related rituals</p>
            </div>
            <div className="service-item">
              <div className="service-icon">🏠</div>
              <h4>House Warming</h4>
              <p>Griha Pravesh ceremonies and Vastu Shanti pujas for new homes</p>
            </div>
            <div className="service-item">
              <div className="service-icon">🔮</div>
              <h4>Astrology Consultation</h4>
              <p>Personalized guidance based on Vedic astrology and birth charts</p>
            </div>
            <div className="service-item">
              <div className="service-icon">📅</div>
              <h4>Festival Celebrations</h4>
              <p>Special pujas and ceremonies for festivals and auspicious occasions</p>
            </div>
            <div className="service-item">
              <div className="service-icon">🕉️</div>
              <h4>Custom Rituals</h4>
              <p>Tailored ceremonies for specific spiritual needs and occasions</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="why-choose-section">
          <h2 className="section-title">Why Families Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h5>Verified Pandits</h5>
              <p>Every pandit undergoes thorough background checks, qualification verification, and quality assessments.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h5>Instant Booking</h5>
              <p>Book pandits with just a few clicks. Real-time availability and instant confirmation.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h5>Secure & Safe</h5>
              <p>Your personal information and payment details are protected with bank-grade security.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h5>Quality Assured</h5>
              <p>All services come with quality guarantees and customer satisfaction commitments.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h5>Pan-India Coverage</h5>
              <p>Access to verified pandits across major cities and towns throughout India.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h5>24/7 Support</h5>
              <p>Dedicated customer support available round the clock for all your needs.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h2 className="section-title">Our Commitment to Excellence</h2>
          <p className="team-description">
            Behind Pandit Booking is a team of spiritual enthusiasts, technology experts, and customer service
            professionals dedicated to preserving India's spiritual heritage while embracing modern innovation.
          </p>
          <div className="commitment-grid">
            <div className="commitment-item">
              <h4>🤝 Trust & Transparency</h4>
              <p>Complete transparency in pricing, services, and pandit profiles</p>
            </div>
            <div className="commitment-item">
              <h4>📚 Knowledge Preservation</h4>
              <p>Supporting the continuation of ancient Vedic traditions and practices</p>
            </div>
            <div className="commitment-item">
              <h4>🌟 Customer First</h4>
              <p>Your satisfaction and spiritual experience are our top priorities</p>
            </div>
          </div>
        </div>

        <p className="about-footer">
          © 2026 Pandit Booking | Made with ❤️ in India | Connecting Tradition with Technology
        </p>
      </div>
    </div>
  );
}

export default About;