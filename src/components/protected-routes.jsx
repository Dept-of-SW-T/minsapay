import { Navigate } from "react-router-dom";
import { auth } from "../features/login-feature";

export function ProtectedRoute({ children }) {
  const user = auth.currentUser;
  if (user === null) return <Navigate to="/login" />;
  switch (user.userType) {
    case "CPU":
      return <Navigate to="/cpu-home" />;
    case "kiosk":
      return <Navigate to="/kiosk-home" />;
    default:
      return <Navigate to="/login" />;
  }
}

export function ProtectedCPU({ children }) {
  const user = auth.currentUser;
  if (user === null) return <Navigate to="/login" />;
  if (user.userType !== "CPU") {
    return <Navigate to="/" />;
  }
  return children;
}

export function ProtectedKiosk({ children }) {
  const user = auth.currentUser;
  if (user === null) return <Navigate to="/login" />;
  if (user.userType !== "kiosk") {
    return <Navigate to="/" />;
  }
  return children;
}
