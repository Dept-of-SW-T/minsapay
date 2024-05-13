import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import Layout from './components/layout'
import Home from './routes/home'
import Login from './routes/login'
import ProtectedRoute from './components/protected-route'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        path: '',
        element: <Home />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])

const GlobalStyles = createGlobalStyle`
  ${reset};
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;
const Wrapper = styled.div`
  background-color: #F5F5F5;
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
  )
}

export default App
