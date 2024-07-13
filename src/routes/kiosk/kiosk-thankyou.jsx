import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import backgroundImagePhoneScreen from "../../images/bg-candidate-phone-screen.png";
import backgroundImageWideScreen from "../../images/bg-candidate-wide-screen.jpg";

// Styled Components
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

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  flex-direction: column;
  gap: 10px;
`;

const Message = styled.div`
  text-align: center;
  font-size: 6vw;
  color: white;
  font-family: "TheJamsil", sans-serif; /* Assuming TheJamsil is a custom font */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const Button = styled.button`
  height: 6vh;
  width: 8vw;
  border-radius: 10px;
  background-color: white;
  color: black;
  font-size: 1vw;
  font-family: "TheJamsil", sans-serif; /* Ensure consistency in font */
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ddd;
  }
`;

export default function KioskThankYou() {
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(10);

  useEffect(() => {
    const navigateTimeout = setTimeout(() => {
      navigate("../kiosk-home/kiosk-cover");
    }, 10000);

    const timer = setInterval(() => {
      setRemainingTime((curr) => curr - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(navigateTimeout);
    };
  }, [navigate]);

  return (
    <OuterWrapper>
      <InnerWrapper>
        <Message>
          감사합니다
          <br /> 남은 시간 {remainingTime}초
        </Message>
        <Button onClick={() => navigate("../kiosk-home/kiosk-cover")}>
          돌아가기
        </Button>
      </InnerWrapper>
    </OuterWrapper>
  );
}
