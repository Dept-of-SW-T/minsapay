import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Login from "./routes/login";
import {
  ProtectedBuyer,
  ProtectedCPU,
  ProtectedKiosk,
  ProtectedRoute,
} from "./components/protected-routes";
import { BACKGROUND_GRAY } from "./components/theme-definition";
import BuyerHome from "./routes/buyer/buyer-home";
import BuyerPayment from "./routes/buyer/buyer-payment";
import CPUHome from "./routes/CPU/cpu-home";
import ChangeMenu from "./routes/CPU/change-menu";
import RefundApproval from "./routes/CPU/refund-approval";
import KioskHome from "./routes/kiosk/kiosk-home";
import KioskCover from "./routes/kiosk/kiosk-cover";
import KioskAuthentiaction from "./routes/kiosk/kiosk-authentication";
import KioskThankYou from "./routes/kiosk/kiosk-thankyou";

const router = createBrowserRouter([
  // 루팅
  {
    path: "/",
    element: <ProtectedRoute />, // 기본 화면으로 실제로는 절대로 display 되지는 않고 사용자를 다른 페이지로 보내는데 사용됨
  },
  {
    path: "buyer-home", // 개발자용
    element: (
      <ProtectedBuyer>
        <BuyerHome />
      </ProtectedBuyer>
    ),
  },
  {
    path: "buyer-home/buyer-payment", // 개발자용
    element: (
      <ProtectedBuyer>
        <BuyerPayment />
      </ProtectedBuyer>
    ),
  },
  {
    path: "cpu-home", // CPU 홈화면이다.
    element: (
      <ProtectedCPU>
        <CPUHome />
      </ProtectedCPU>
    ),
  },
  {
    path: "cpu-home/change-menu", // 메뉴 변경 화면
    element: (
      <ProtectedCPU>
        <ChangeMenu />
      </ProtectedCPU>
    ),
  },
  {
    path: "cpu-home/refund-approval", // 환불 승인 화면
    element: (
      <ProtectedCPU>
        <RefundApproval />
      </ProtectedCPU>
    ),
  },
  {
    path: "/kiosk-home", // kiosk 홈화면
    element: (
      <ProtectedKiosk>
        <KioskHome />
      </ProtectedKiosk>
    ),
  },
  {
    path: "/kiosk-home/kiosk-cover", // kiosk에서 어서오십시오? 이런 화면
    element: (
      <ProtectedKiosk>
        <KioskCover />
      </ProtectedKiosk>
    ),
  },
  {
    path: "/kiosk-home/kiosk-authentication", // 인증 번호 띄우는 화면
    element: (
      <ProtectedKiosk>
        <KioskAuthentiaction />
      </ProtectedKiosk>
    ),
  },
  {
    path: "/kiosk-home/kiosk-thankyou", // 감사합니다!!
    element: (
      <ProtectedKiosk>
        <KioskThankYou />
      </ProtectedKiosk>
    ),
  },
  {
    path: "/login", // 로그인 화면으로 아무런 보호 조치가 없다.
    element: <Login />,
  },
]);
const GlobalStyles = createGlobalStyle`
  ${reset};
  * { 
    @font-face {
      font-family: 'BMDOHYEON';
      src: url('https://cdn.jsdelivr.net/gh/wizfile/font/BMDOHYEON.eot');
      src:url('https://cdn.jsdelivr.net/gh/wizfile/font/BMDOHYEON.woff') format('woff');
      font-style: normal;
    }
		font-family: "BMDOHYEON"; // 폰트 정의
    @font-face {
    font-family: 'SOGANGUNIVERSITYTTF';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/SOGANGUNIVERSITYTTF.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    }
  }
`;

const Wrapper = styled.div`
  background-color: ${BACKGROUND_GRAY};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  font-size: calc(0.6vw + 0.6em); // 자세한 수치 조절
  //font-size: 2vw;
`; // 정중앙에 세로로 div를 하나 세워준다,

function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;
