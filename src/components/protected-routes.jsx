import { Navigate } from "react-router-dom";
import { auth } from "../features/login-feature";

export function ProtectedRoute() {
  // home 화면에 적용되며 원하는 페이지로 user를 보내는 역할을 한다.
  const user = auth.currentUser;
  if (user === null) return <Navigate to="/login" />;
  switch (user.userType) {
    case "developer":
      return <Navigate to="/developer-home" />;
    case "CPU":
      return <Navigate to="/cpu-home" />;
    case "kiosk":
      return <Navigate to="/kiosk-home/kiosk-cover" />;
    case "buyer":
      return <Navigate to="/buyer-home" />;
    case "seller":
      return <Navigate to="/seller-home/seller-select" />;
    case "moderator":
      return <Navigate to="/moderator-home" />;
    default:
      return <Navigate to="/login" />;
  }
}
export function ProtectedDeveloper({ children }) {
  const user = auth.currentUser;
  if (user === null) return <Navigate to="/login" />;
  if (user.userType !== "developer") {
    return <Navigate to="/" />;
  }
  return children;
}

export function ProtectedBuyer({ children }) {
  const user = auth.currentUser;
  if (user === null) return <Navigate to="/login" />;
  if (user.userType !== "buyer") {
    return <Navigate to="/" />;
  }
  return children;
}

export function ProtectedCPU({ children }) {
  // CPU routes에 적용되며 CPU가 아닌 자를 홈화면으로 보낸다.
  const user = auth.currentUser;
  if (user === null) return <Navigate to="/login" />;
  if (user.userType !== "CPU") {
    return <Navigate to="/" />;
  }
  return children;
}
export function ProtectedKiosk({ children }) {
  // kiosk routes에 적용되며 kiosk가 아닌 자를 홈화면으로 보낸다.
  const user = auth.currentUser;
  if (user === null) return <Navigate to="/login" />;
  if (user.userType !== "kiosk") {
    return <Navigate to="/" />;
  }
  return children;
}

export function ProtectedSeller({ children }) {
  const user = auth.currentUser;
  if (user === null) return <Navigate to="/login" />;
  if (user.userType !== "seller") {
    return <Navigate to="/" />;
  }
  return children;
}

export function ProtectedModerator({ children }) {
  const user = auth.currentUser;
  if (user === null) return <Navigate to="/login" />;
  if (user.userType !== "moderator") {
    return <Navigate to="/" />;
  }
  return children;
}
