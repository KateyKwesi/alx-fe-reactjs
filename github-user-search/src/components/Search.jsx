import { useState } from "react";
import { fetchUserData } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUser(null);

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch (err) {
      console.log(err);
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Search GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>

      {/* Conditional Rendering */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && (
        <div style={styles.result}>
          <img src={user.avatar_url} alt={user.login} style={styles.avatar} />
          <h3>{user.name || user.login}</h3>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            Visit GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "1rem", maxWidth: "400px" },
  form: { display: "flex", gap: "0.5rem" },
  input: {
    flex: 1,
    padding: "0.5rem",
    border: "1px solid #ddd",
  },
  button: {
    padding: "0.5rem 1rem",
    background: "#24292e",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  result: {
    marginTop: "1rem",
    textAlign: "center",
    border: "1px solid #eee",
    padding: "1rem",
    borderRadius: "6px",
  },
  avatar: {
    width: "100px",
    borderRadius: "50%",
  },
};
