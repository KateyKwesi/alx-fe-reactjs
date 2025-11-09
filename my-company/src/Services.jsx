function Services() {
  const card = {
    padding: "16px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    background: "white",
  };

  const list = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "12px",
    listStyle: "none",
    padding: 0,
    margin: 0,
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Our Services</h1>
      <ul style={list}>
        <li style={card}>Technology Consulting</li>
        <li style={card}>Market Analysis</li>
        <li style={card}>Product Development</li>
      </ul>
    </div>
  );
}

export default Services;
