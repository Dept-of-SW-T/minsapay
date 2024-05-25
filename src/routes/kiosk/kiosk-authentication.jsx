import { useEffect, useState } from "react";
import { kioskFirebase } from "../../features/kiosk-firebase-interaction";
import { useNavigate } from "react-router-dom";

export default function KioskAuthentiaction() {
  // only one kiosk per team allowed yet
  const navigate = useNavigate();
  const [kioskAuthenticationNumber, setKioskAuthenticationNumber] = useState();
  useEffect(() => {
    const init = async () => {
      await kioskFirebase.init();
      await kioskFirebase.setKioskAuthenticationNumber();
      setKioskAuthenticationNumber(
        kioskFirebase.userDocData.kiosk_authentication_number,
      );
    };
    init();
    const timer = setInterval(async () => {
      await kioskFirebase.syncDoc();
      if (kioskFirebase.userDocData.linked_buyer !== "")
        navigate("../kiosk-home");
    }, 1000);
    return () => clearInterval(timer);
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
      <p>kiosk authentication</p>
      {kioskAuthenticationNumber}
    </div>
  );
}
