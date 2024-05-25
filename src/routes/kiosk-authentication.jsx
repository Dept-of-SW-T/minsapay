import { useEffect, useState } from "react";
import { kioskFirebase } from "../features/kiosk-firebase-interaction";

export default function KioskAuthentiaction() {
  // only one kiosk per team allowed yet
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
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <p>kiosk authentication</p>
      {kioskAuthenticationNumber}
    </div>
  );
}
