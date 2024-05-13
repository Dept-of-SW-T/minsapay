import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../features/login-feature";
import styled from "styled-components";
const MINSAPAY_BLUE = "#66A3FF"

// figma 제대로 된 치수 필요
const WRAPPER_WIDTH = 420;
const Wrapper = styled.div`
  width: ${WRAPPER_WIDTH}px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
`;
const LoginBox = styled.div`
  height: 600px;
  background-color: white;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  margin-right: 40px;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Title = styled.h1`
  font-size: 42px;
`;
const Input = styled.input`
  padding: 10px 30px;
  border: none;
  width: ${WRAPPER_WIDTH - 60}px;
  font-size: 22px; 
  outline: none;
  border-bottom: 3px solid #ccc;
  margin-top: 30px;
  &:focus {
    border-bottom: 3px solid #000;
  }
  &[type="submit"] {
    margin-top: 30px;
    cursor: pointer;
    width: 130px;
    height: 60px;
    border-radius: 50px;
    background-color: ${MINSAPAY_BLUE};
    color: white;
    font-size: 20px;
    font-weight: bold;
    &:hover {
      opacity: 0.8;
    }
  }
`;
const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

function returnError(error) {
  switch (error) {
    case "auth/invalid-credential":
      return "아이디 또는 비번이 잘못되었습니다."
    default:
      return error;
  }
} // 자세한 에러 목록 추가


export default function Login() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (userID === "" || password === "") return;
    await auth.signIn(userID, password);
    setError(auth.error);
    auth.error = "";
    //navigate("/");
  }

  return (
    <Wrapper>
      <LoginBox>
        <Title>Login 𝕏</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={ e => setUserID(e.target.value) }
            value={userID}
            name="UserID"
            placeholder="Student ID"
            type="text"
            required
          />
          <Input
            onChange={ e => setPassword(e.target.value) }
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