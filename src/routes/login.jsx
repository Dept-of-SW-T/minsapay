import { useState } from "react";
import { auth } from "../features/login-feature";
import styled from "styled-components";
import Logo from "../images/LogoMinsapay.svg";
import { useNavigate } from "react-router-dom";
import {
  BORDER_GRAY,
  BUTTON_SHADOW,
  MINSAPAY_BLUE,
} from "../components/theme-definition";

// figma 제대로 된 치수 필요
const Wrapper = styled.div`
  width: 50vh;
  @media only screen and (max-aspect-ratio: 5 / 8) {
    width: 90vw;
  }
  /*@media only screen and (max-width: 1000px) {
    font-size: calc(0.7vw + 1em);
  } */
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LoginBox = styled.div`
  height: 80vh;
  width: 100%;
  background-color: white;
  border-radius: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const TitleDiv = styled.div`
  margin-top: 20%;
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const Title = styled.span`
  font-size: 330%;
  @media only screen and (max-width: 2000px) {
    font-size: calc(0.3vw + 2.7em);
  }
  font-family: "BMDOHYEON";
`;
const Image = styled.img`
  height: 80%;
`;
const Form = styled.form`
  height: 50%;
  padding-top: 20%;
  margin-bottom: 1.6%;
  /*   margin-right: 40px;
  margin-left: 40px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: "BMDOHYEON";
`;
const Input = styled.input`
  padding: 1.3% 0px;
  border: none;
  width: 80%;
  font-size: 60%;
  outline: none;
  border-bottom: 3px solid ${BORDER_GRAY};
  margin-top: 7%;
  font-family: "BMDOHYEON";
  @media only screen and (max-width: 2000px) {
    font-size: 0.7em;
  }
  &:focus {
    border-bottom: 3px solid #444;
  }
  &[name="password"] {
    // BMDOWYEON 폰트는 비밀번호를 지원하지 않기에 비밀번호 입력은 본래 글씨체 적용
    font-family: sans-serif;
    &::placeholder {
      font-family: "BMDOHYEON";
    }
  }
  &[type="submit"] {
    // 로그인 버튼
    margin-top: 20%;
    margin-bottom: 10%;

    width: 35%;
    height: 17%;
    border-radius: 50px;
    border-bottom: 0px;
    box-shadow: 0px 4px 4px 0px ${BUTTON_SHADOW};
    background-color: ${MINSAPAY_BLUE};
    color: white;
    font-size: 1em;
    @media only screen and (max-width: 800px) {
      font-size: calc(0.12vw + 1.08em);
    }
    font-weight: normal;
    font-family: "BMDOHYEON";

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
`;
const Error = styled.span`
  // 로그인 에러 모두 띄우는 거
  font-size: 56%;
  color: tomato;
  font-family: "BMDOHYEON";
  margin-bottom: 4%;
`;

export default function Login() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (userID === "" || password === "") return;
    const successfulSignIn = await auth.signIn(userID, password);
    if (successfulSignIn) {
      // 로그인에 성공하면
      navigate("/"); // 홈으로
    } else if (auth.error === "")
      setError("이유불명 로그인 에러"); // signIn에서 잡지 못하는 에러
    else setError(auth.error);
  };
  return (
    <Wrapper>
      <LoginBox>
        <TitleDiv>
          <Title>Login </Title>
          <Image src={Logo} />
        </TitleDiv>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={(e) => setUserID(e.target.value)}
            value={userID}
            name="UserID"
            placeholder="Student ID"
            type="text"
            required
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            placeholder="Password"
            type="password"
            required
          />
          <Input type="submit" value={"로그인"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
      </LoginBox>
    </Wrapper>
  );
}
