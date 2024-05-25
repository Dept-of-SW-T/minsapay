import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { buyerFirebase } from "../../features/buyer-firebase-interaction";

export default function BuyerHome() {
  const navigate = useNavigate();
  useEffect(() => {
    const init = async () => {
      await buyerFirebase.init();
    };
    init();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <p>Buyer Home</p>
      <button onClick={() => navigate("./buyer-payment")}>
        To Buyer Payment
      </button>
    </div>
  );
}
