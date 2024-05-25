import { useNavigate } from "react-router-dom";

export default function KioskCover() {
  // 지금 꺼 다 지우고 아얘 처음부터 다시 만들기
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
