import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const wrap = { padding: "20px" };
  const field = {
    display: "block",
    width: "100%",
    maxWidth: "520px",
    margin: "10px 0",
    padding: "10px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
  };
  const btn = {
    marginTop: "8px",
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
    background: "#0ea5e9",
    color: "white",
    cursor: "pointer",
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Form submitted!\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    );
  };

  return (
    <div style={wrap}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={field}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={field}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          style={{ ...field, resize: "vertical" }}
          required
        />
        <button type="submit" style={btn}>
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
