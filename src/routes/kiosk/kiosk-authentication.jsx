import { useEffect, useState } from "react";
import { kioskFirebase } from "../../features/kiosk-firebase-interaction";
import { useNavigate } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";

export default function KioskAuthentiaction() {
  // only one kiosk per team allowed yet
  const navigate = useNavigate();
  const [kioskAuthenticationNumber, setKioskAuthenticationNumber] = useState();
  useEffect(() => {
    let unsubscribe = null;
    const init = async () => {
      await kioskFirebase.init();
      await kioskFirebase.setKioskAuthenticationNumber();
      setKioskAuthenticationNumber(
        kioskFirebase.userDocData.kiosk_authentication_number,
      );
    };
    init();
    unsubscribe = onSnapshot(kioskFirebase.userDocRef, (doc) => {
      kioskFirebase.userDocData = doc.data();
      if (kioskFirebase.userDocData.linked_buyer !== "")
        navigate("../kiosk-home");
    });
    return () => {
      unsubscribe && unsubscribe();
    };
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
