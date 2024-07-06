import { useEffect, useState } from "react";
import { kioskFirebase } from "../../features/kiosk-firebase-interaction";
import { useNavigate } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";
import styled from "styled-components";
import backgroundImagePhoneScreen from "../../images/bg-candidate-phone-screen.png";
import backgroundImageWideScreen from "../../images/bg-candidate-wide-screen.jpg";

const OuterWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${backgroundImageWideScreen});
  @media only screen and (max-width: 768px) {
    background-image: url(${backgroundImagePhoneScreen});
    background-size: cover;
  }
`;

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
    <OuterWrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          background: "rgba(0,0,0,0.5)",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div
          style={{
            fontSize: "6.0vw",
            color: "white", // 글씨 색상
            fontFamily: "TheJamsil",
          }}
        >
          {kioskAuthenticationNumber}
        </div>
      </div>
    </OuterWrapper>
  );
}
