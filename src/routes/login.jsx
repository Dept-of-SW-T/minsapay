import { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

export const Title = styled.h1`
  font-size: 42px;
`;

export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    background-color: #1d9bf0;
    color: white;
    &:hover {
      opacity: 0.8;
    }
  }
`;
// 학번 비번 입력란이 너무 길다

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export default function Login() {
  const [studentID, setStudentID] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Wrapper>
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
        <Input type="submit" value={"Log in"} />
      </Form>
    </Wrapper>
  );
}