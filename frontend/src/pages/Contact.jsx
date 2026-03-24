import "./Contact.css";

function Contact() {
  return (
    <div style={{ marginTop: "70px" }}>
    <div className="contact-container">
      
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">
        Have questions or need help booking a pandit? Reach out to us!
      </p>

      <div className="contact-wrapper">

        {/* Left Side - Info */}
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>📍 Location: India</p>
          <p>📞 Phone: +91 8287631167</p>
          <p>📧 Email: support@panditbooking.com</p>
          <p>⏰ Available: 9 AM - 8 PM</p>
        </div>

        {/* Right Side - Form */}
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>

          <button type="submit">Send Message</button>
        </form>

      </div>

      <p className="contact-footer">
        We usually respond within 24 hours.
      </p>

    </div>
    </div>
  );
}

export default Contact;