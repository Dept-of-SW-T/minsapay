import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CPUFirebase } from "../../features/CPU-firebase-interaction";
import { onSnapshot } from "firebase/firestore";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh; // 전체 화면 높이 설정
  width: 100vw;
`;
const KioskImage = styled.img`
  width: 100%;
  height: 100%;
`;

export default function KioskCover() {
  // 지금 꺼 전체적으로 수정
  const navigate = useNavigate();
  const [kioskImageDownloadUrl, setKioskImageDownloadUrl] = useState("");
  useEffect(() => {
    let unsubscribe = null;
    const init = async () => {
      await CPUFirebase.init();
      await CPUFirebase.kioskImageInit();
      setKioskImageDownloadUrl(CPUFirebase.kioskImageDownloadUrl);
      if (CPUFirebase.userDocData.linked_buyer !== "")
        navigate("../kiosk-home");
    };
    init();
    unsubscribe = onSnapshot(CPUFirebase.userDocRef, async (doc) => {
      CPUFirebase.userDocData = doc.data();
      await CPUFirebase.kioskImageInit();
      setKioskImageDownloadUrl(CPUFirebase.kioskImageDownloadUrl);
      if (CPUFirebase.userDocData.linked_buyer !== "")
        navigate("../kiosk-home");
    });
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  const handleClick = () => {
    navigate("../kiosk-home/kiosk-authentication");
  };

  return (
    <Wrapper>
      <KioskImage src={kioskImageDownloadUrl} onClick={handleClick} />
    </Wrapper>
  );
}
