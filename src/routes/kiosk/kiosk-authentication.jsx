import { useEffect, useState } from "react";
import { kioskFirebase } from "../../features/kiosk-firebase-interaction";
import { useNavigate } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";

export default function KioskAuthentication() {
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
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        background: "radial-gradient(circle, #2b81ea, #06195e)", // 파란색 그라데이션- 색 수정 필요
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          fontSize: "6.0vw",
          color: "white", // 글씨 색상
          fontFamily: "Century Gothic",
        }}
      >
        {kioskAuthenticationNumber}
      </div>
    </div>
  );
}
