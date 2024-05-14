import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  /* const user = auth.currentUser;
  if (user === null) {
    return <Navigate to="/login" />;
  } */
  return children;
}
