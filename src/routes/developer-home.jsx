import { useNavigate } from "react-router-dom";
import { auth } from "../features/login-feature";

// some things about adding users and deleting users
export default function DeveloperHome() {
  const navigate = useNavigate();
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Developer Home</h1>

      <button
        onClick={async () => {
          await auth.signOut();
          navigate("../");
        }}
      >
        Log out
      </button>
    </div>
  );
}
