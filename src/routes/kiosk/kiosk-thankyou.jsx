import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function KioskThankYou() {
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(10);
  useEffect(() => {
    setTimeout(() => {
      navigate("../kiosk-home/kiosk-cover");
    }, 10000);
    const timer = setInterval(() => {
      setRemainingTime((curr) => curr - 1);
    }, 1000);
    return () => clearInterval(timer);
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
            textAlign: "center",
            fontSize: "6.0vw",
            color: "white",
            fontFamily: "Century Gothic",
          }}
        >
          감사합니다!! <br /> 남은 시간 : {remainingTime}초
        </div>
        <div></div>
        <button
          style={{
            height: "6vh",
            width: "8vw",
          }}
          onClick={() => {
            navigate("../kiosk-home/kiosk-cover");
          }}
        >
          돌아가기
        </button>
      </div>
    </OuterWrapper>
  );
}
