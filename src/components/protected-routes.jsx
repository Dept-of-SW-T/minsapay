import { Navigate } from "react-router-dom";
import { auth } from "../features/login-feature";

export function ProtectedRoute() {
  // home 화면에 적용되며 원하는 페이지로 user를 보내는 역할을 한다.
  const user = auth.currentUser;
  if (user === null) return <Navigate to="/login" />;
  switch (user.userType) {
    case "CPU":
      return <Navigate to="/cpu-home" />;
    case "kiosk":
      return <Navigate to="/kiosk-home/kiosk-cover" />;
    case "buyer":
      return <Navigate to="/buyer-home" />;
    default:
      return <Navigate to="/login" />;
  }
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

// 앞으로 ProtectedSeller를 만들어야 함.
/*
export function ProtectedSeller({ children }) {
  const user = auth.currentUser;
  if (user === null) return <Navigate to="/login" />;
  if (user.userType !== "seller") {
    return <Navigate to="/" />;
  }
  return children;
}
*/
