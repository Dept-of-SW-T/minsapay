import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CPUFirebase } from "../../features/CPU-firebase-interaction";
import { onSnapshot } from "firebase/firestore";
import styled from "styled-components";
import Loading from "../../components/loading";

const Wrapper = styled.div`
  height: 100vh; // 전체 화면 높이 설정
  width: 100vw;
`;
const KioskImage = styled.img`
  height: 100%; // 부모 요소의 전체 높이
  width: 100%; // 부모 요소의 전체 너비
  object-fit: cover; // 이미지 비율을 유지하면서 크기를 조절
`;

export default function KioskCover() {
  // 지금 꺼 전체적으로 수정
  const navigate = useNavigate();
  const [kioskImageDownloadUrl, setKioskImageDownloadUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    let unsubscribe = null;
    const init = async () => {
      await CPUFirebase.init();
      await CPUFirebase.kioskImageInit();
      setKioskImageDownloadUrl(CPUFirebase.kioskImageDownloadUrl);
      setIsLoading(false);
      if (CPUFirebase.userDocData.linked_buyer !== "") navigate("/kiosk-home");
    };
    init();
    unsubscribe = onSnapshot(CPUFirebase.userDocRef, async (doc) => {
      CPUFirebase.userDocData = doc.data();
      await CPUFirebase.kioskImageInit();
      setKioskImageDownloadUrl(CPUFirebase.kioskImageDownloadUrl);
      if (CPUFirebase.userDocData.linked_buyer !== "") navigate("/kiosk-home");
    });
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  const handleClick = () => {
    navigate("/kiosk-home/kiosk-authentication");
  };

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 로딩 컴포넌트 표시
  }

  return (
    <Wrapper>
      <KioskImage src={kioskImageDownloadUrl} onClick={handleClick} />
    </Wrapper>
  );
}
