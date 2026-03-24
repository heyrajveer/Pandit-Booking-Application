import "./Footer.css"
function Footer() {
  return (
    <footer className="footer text-white text-center py-3">

      {/* 🔗 Social Icons */}
      <div className="mb-2">

        <a href="tel:+919876543210" className="footer-icon">
          📞
        </a>

        <a href="#" className="footer-icon">
          📸
        </a>

        <a href="#" className="footer-icon">
          💼
        </a>

      </div>

      {/* © Copyright */}
      <div className="small ">
        © 2026 Pandit Booking. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;