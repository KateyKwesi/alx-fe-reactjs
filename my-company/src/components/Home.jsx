function Home() {
  const wrap = { padding: "20px" };
  const hero = {
    padding: "24px",
    borderRadius: "12px",
    background:
      "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(99,102,241,0.15))",
  };

  return (
    <div style={wrap}>
      <div style={hero}>
        <h1 style={{ margin: 0 }}>Welcome to Our Company</h1>
        <p style={{ marginTop: "10px", lineHeight: 1.6 }}>
          We are dedicated to delivering excellence in all our services.
        </p>
      </div>
    </div>
  );
}

export default Home;
