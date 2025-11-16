// src/App.jsx
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: "Arial, sans-serif", padding: "1rem" }}>
        {/* Navigation */}
        <nav
          style={{
            display: "flex",
            gap: "1rem",
            padding: "1rem 0",
            borderBottom: "1px solid #eee",
            marginBottom: "1rem",
          }}
        >
          <NavLink
            to="/"
            style={({ isActive }) => ({
              ...navLinkStyle,
              color: isActive ? "#0056b3" : "#007bff",
              fontWeight: isActive ? "bold" : "500",
            })}
          >
            All Recipes
          </NavLink>
          <NavLink
            to="/add"
            style={({ isActive }) => ({
              ...navLinkStyle,
              color: isActive ? "#0056b3" : "#007bff",
              fontWeight: isActive ? "bold" : "500",
            })}
          >
            Add New Recipe
          </NavLink>
        </nav>

        {/* Page Title */}
        <header style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ margin: 0, fontSize: "2rem", color: "#333" }}>
            My Recipe Sharing App
          </h1>
        </header>

        {/* Routes */}
        <main>
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/add" element={<AddRecipeForm />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

// Base style for nav links
const navLinkStyle = {
  textDecoration: "none",
  padding: "0.5rem 0",
};

export default App;