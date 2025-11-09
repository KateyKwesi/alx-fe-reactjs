import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  const bar = {
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "#0f172a",
    padding: "12px 16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
  };

  const nav = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    maxWidth: "960px",
    margin: "0 auto",
    color: "white",
  };

  const brand = {
    fontWeight: 700,
    fontSize: "18px",
    letterSpacing: "0.5px",
    marginRight: "auto",
  };

  const link = (to) => ({
    color: pathname === to ? "#38bdf8" : "white",
    textDecoration: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    background: pathname === to ? "rgba(56, 189, 248, 0.12)" : "transparent",
  });

  return (
    <header style={bar}>
      <nav style={nav}>
        <span style={brand}>MyCompany</span>
        <Link to="/" style={link("/")}>
          Home
        </Link>
        <Link to="/about" style={link("/about")}>
          About
        </Link>
        <Link to="/services" style={link("/services")}>
          Services
        </Link>
        <Link to="/contact" style={link("/contact")}>
          Contact
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
