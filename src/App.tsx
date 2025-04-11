import { createBrowserRouter, RouterProvider } from "react-router-dom"
import reset from "styled-reset";
import Layout from "./components/layout"
import Profile from "./routes/profile"
import Home from "./routes/home"
import CreateAccount from "./routes/create-account";
import Login from "./routes/login"
import styled, { createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";

const router = createBrowserRouter([
  {
    path : "/",
    element : <Layout />,
    children : [
      {
        path : "",
        element : <Home />
    },
    {
      path : "profile",
      element : <Profile />
    },
  ],
  },
  {
    path : "/login",
    element : <Login />,
  },
  {
    path : "/create-account", 
    element : <CreateAccount />}
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetics Neue',
    sans-serif;
  }
`;
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const init = async() => {
    await auth.authStateReady(); //최종 인증 상태가 완료되면 실행되는 promise를 return. -> firebase가 쿠키와 토큰을 읽고 백앤드랑 소통해서 로그인 여부를 확인하는 동안 기다림
    setIsLoading(false);
  };
  useEffect(() => { 
    init();
  },[])

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  )
}

export default App
