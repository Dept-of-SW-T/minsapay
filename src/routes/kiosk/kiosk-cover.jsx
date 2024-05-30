import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kioskFirebase } from "../../features/kiosk-firebase-interaction";
import { onSnapshot } from "firebase/firestore";

export default function KioskCover() {
  // 지금 꺼 전체적으로 수정
  useEffect(() => {
    let unsubscribe = null;
    const init = async () => {
      await kioskFirebase.init();
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
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div>kiosk cover</div>
      <button
        onClick={() => {
          navigate("../kiosk-home/kiosk-authentication");
        }}
      >
        계속하기 {">>"}
      </button>
    </div>
  );
}
