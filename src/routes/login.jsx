import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const MINSAPAY_BLUE = "#66A3FF"

const WRAPPER_WIDTH = 420; // figma 제대로 된 치수 필요
const Wrapper = styled.div`
  width: ${WRAPPER_WIDTH}px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Title = styled.h1`
  font-size: 42px;
`;
const Input = styled.input`
  padding: 10px 20px;
  border: none;
  width: ${WRAPPER_WIDTH - 40}px;
  font-size: 16px; // 및줄 형식으로 바꾸기
  &[type="submit"] {
    cursor: pointer;
    width: 160px; // figma 제대로 된 치수 필요
    height: 60px;
    border-radius: 50px;
    background-color: ${MINSAPAY_BLUE};
    color: white;
    font-size: 24px; // 폰트 크기 맞추기
    font-weight: bold;
    &:hover {
      opacity: 0.8;
    }
  }
`;
const LoginError = styled.span`
  font-weight: 600;
  color: tomato;
`;
// 

export default function Login() {
  const [studentID, setStudentID] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Wrapper>
      <LoginBox>
        <Title>Login 𝕏</Title>
        <Form>
          <Input
            onChange={ e => setStudentID(e.target.value) }
            value={studentID}
            name="StudentID"
            placeholder="학번"
            type="text"
            required
          />
          <Input
            onChange={ e => setPassword(e.target.value) }
            value={password}
            name="password"
            placeholder="비번"
            type="password"
            required
          />
          <Input type="submit" value={"확인"} />
        </Form>
      </LoginBox>
    </Wrapper>
  );
}