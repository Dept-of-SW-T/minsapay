import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Layout from "./components/layout";
import Login from "./routes/login";
import ProtectedRoute from "./components/protected-route";
import CPUHome from "./routes/cpu-home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "cpu-home",
        element: <CPUHome />,
      },
    ],
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
