import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Login from "./routes/login";
import { ProtectedCPU, ProtectedRoute } from "./components/protected-routes";
import CPUHome from "./routes/cpu-home";
import ChangeMenu from "./routes/change-menu";
import RefundApproval from "./routes/refund-approval";

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
    path: "/login",
    element: <Login />,
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;
const Wrapper = styled.div`
  background-color: #f5f5f5;
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
