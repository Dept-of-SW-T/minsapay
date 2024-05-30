import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div>
        감사합니다!! <br /> 남은 시간 : {remainingTime}초
      </div>
      <button
        onClick={() => {
          navigate("../kiosk-home/kiosk-cover");
        }}
      >
        돌아가기
      </button>
    </div>
  );
}
