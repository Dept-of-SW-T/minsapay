import { Navigate } from "react-router-dom";
import { auth } from "../features/login-feature";

export function ProtectedRoute({ children }) {
  const user = auth.currentUser;
  if (user === null) {
    return <Navigate to="/login" />;
  } else if (user.userType === "CPU") {
    return <Navigate to="/cpu-home" />;
  }
  return children;
}

export function ProtectedCPU({ children }) {
  const user = auth.currentUser;
  if (user.userType !== "CPU") {
    return <Navigate to="/" />;
  }
  return children;
}
