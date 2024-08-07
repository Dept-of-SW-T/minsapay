import { Navigate } from "react-router-dom";
import { loginUtils } from "../features/login-feature";

export function ProtectedRoute() {
  // home 화면에 적용되며 원하는 페이지로 user를 보내는 역할을 한다.
  if (!loginUtils.isLoggedIn()) return <Navigate to="/login" />;
  const loginType = loginUtils.getLoginType();
  switch (loginType) {
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
      return <Navigate to="/moderator/home" />;
    default:
      return <Navigate to="/login" />;
  }
}
export function ProtectedLoginSetting({ children }) {
  if (!loginUtils.isLoggedIn()) return <Navigate to="/login" />;
  else return children;
}
export function ProtectedDeveloper({ children }) {
  if (!loginUtils.isLoggedIn()) return <Navigate to="/login" />;
  const userClass = loginUtils.getUserClass();
  if (userClass !== "developer") {
    return <Navigate to="/" />;
  }
  return children;
}

export function ProtectedBuyer({ children }) {
  if (!loginUtils.isLoggedIn()) return <Navigate to="/login" />;
  const userClass = loginUtils.getUserClass();
  if (userClass !== "student") {
    return <Navigate to="/" />;
  }
  return children;
}

export function ProtectedCPU({ children }) {
  if (!loginUtils.isLoggedIn()) return <Navigate to="/login" />;
  const userClass = loginUtils.getUserClass();
  if (userClass !== "team") {
    return <Navigate to="/" />;
  }
  return children;
}
export function ProtectedKiosk({ children }) {
  if (!loginUtils.isLoggedIn()) return <Navigate to="/login" />;
  const userClass = loginUtils.getUserClass();
  if (userClass !== "team") {
    return <Navigate to="/" />;
  }
  return children;
}

export function ProtectedSeller({ children }) {
  if (!loginUtils.isLoggedIn()) return <Navigate to="/login" />;
  const userClass = loginUtils.getUserClass();
  if (userClass !== "student") {
    return <Navigate to="/" />;
  }
  return children;
}

export function ProtectedModerator({ children }) {
  if (!loginUtils.isLoggedIn()) return <Navigate to="/login" />;
  const userClass = loginUtils.getUserClass();
  if (userClass !== "moderator") {
    return <Navigate to="/" />;
  }
  return children;
}

export function ProtectedLog({ children }) {
  if (!loginUtils.isLoggedIn()) return <Navigate to="/login" />;
  const userClass = loginUtils.getUserClass();
  if (userClass !== "moderator" && userClass !== "developer") {
    return <Navigate to="/" />;
  }
  return children;
}
