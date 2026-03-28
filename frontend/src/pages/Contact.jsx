import { useState } from "react";
import "./Contact.css";
import API from "../api/axios";
import { toast } from "react-toastify";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      toast("Message sent successfully ✅");
      await API.post("/contact", form);
     

      setForm({
        name: "",
        email: "",
        message: ""
      });

    } catch (error) {
      console.error(error);
      toast("Failed to send message ❌");
    }
  };

  return (
    <div style={{ marginTop: "70px" }}>
      <div className="contact-container">

        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">
          Have questions or need help booking a pandit? Reach out to us!
        </p>

        <div className="contact-wrapper">

          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>📍 Location: India</p>
            <p>📞 Phone: +91 8287631167</p>
            <p>📧 Email: thinkercreative@gmail.com</p>
            <p>⏰ Available: 9 AM - 8 PM</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>

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