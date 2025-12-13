import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import Post from "./components/Post";
import BlogPost from "./components/BlogPost";

function App() {
  const isAuthenticated = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/post/:id" element={<Post />} />

        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
