import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { kioskFirebase } from "../../features/kiosk-firebase-interaction";
import { onSnapshot } from "firebase/firestore";
import kioskImage from "../../images/ChangeKioskImage.svg"; //부스 이미지가 뭔지 모르겠어서 우선 대충 이거 넣어놓음. 부스 개별 사진으로 바꿔줄 것.

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

  const kioskCoverStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    backgroundImage: `url(${kioskImage})`, // 배경 이미지 설정
    backgroundSize: "cover", // 이미지가 요소를 덮도록 설정
    backgroundPosition: "center", // 이미지를 중앙에 위치시키기
    height: "100vh", // 전체 화면 높이 설정
    width: "100vw",
  };

  /*return (
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
  );*/
  /*return (
    <div style={kioskCoverStyle}>
      <div>kiosk cover</div>
      <button
        onClick={() => {
          navigate("../kiosk-home/kiosk-authentication");
        }}
      >
        계속하기 {">>"}
      </button>
    </div>
  );*/

  const handleClick = () => {
    navigate("../kiosk-home/kiosk-authentication");
  };

  return <div style={kioskCoverStyle} onClick={handleClick}></div>;
}
