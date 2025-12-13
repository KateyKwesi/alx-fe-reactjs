import { Navigate } from "react-router-dom";

function useAuth() {
  return { isAuthenticated: true };
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
