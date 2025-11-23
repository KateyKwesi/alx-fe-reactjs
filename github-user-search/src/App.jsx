import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Search from "./components/Search";

function Layout({ children }) {
  const key = import.meta.env.VITE_APP_GITHUB_API_KEY;
  console.log(key);
  return (
    <div className="app-container">
      <header style={styles.header}>
        <nav></nav>
      </header>

      <main style={styles.main}>{children}</main>
      <div style={{ padding: "2rem" }}>
        <Search />
      </div>
    </div>
  );
}

function Home() {
  return <h2>Welcome to the Home Page</h2>;
}

function About() {
  return <h2>About This Application</h2>;
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

const styles = {
  header: {
    padding: "1rem",
    background: "#222",
    color: "#fff",
    display: "flex",
    gap: "1rem",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    marginRight: "1rem",
  },
  main: {
    padding: "2.1rem",
  },
  footer: {
    padding: "1rem",
    background: "#f4f4f4",
    marginTop: "2rem",
    textAlign: "center",
  },
};
