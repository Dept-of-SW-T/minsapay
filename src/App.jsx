import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Login from "./routes/login";
import {
  ProtectedCPU,
  ProtectedKiosk,
  ProtectedRoute,
} from "./components/protected-routes";
import CPUHome from "./routes/cpu-home";
import ChangeMenu from "./routes/change-menu";
import RefundApproval from "./routes/refund-approval";
import KioskHome from "./routes/kiosk-home";
import KioskAuthentiaction from "./routes/kiosk-authentication";
import { BACKGROUND_GRAY } from "./components/theme-definition";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
  },
  {
    path: "cpu-home",
    element: (
      <ProtectedCPU>
        <CPUHome />
      </ProtectedCPU>
    ),
  },
  {
    path: "cpu-home/change-menu",
    element: (
      <ProtectedCPU>
        <ChangeMenu />
      </ProtectedCPU>
    ),
  },
  {
    path: "cpu-home/refund-approval",
    element: (
      <ProtectedCPU>
        <RefundApproval />
      </ProtectedCPU>
    ),
  },
  {
    path: "/kiosk-home",
    element: (
      <ProtectedKiosk>
        <KioskHome />
      </ProtectedKiosk>
    ),
  },
  {
    path: "/kiosk-home/kiosk-authentication",
    element: (
      <ProtectedKiosk>
        <KioskAuthentiaction />
      </ProtectedKiosk>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;
const Wrapper = styled.div`
  background-color: ${BACKGROUND_GRAY};
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;
