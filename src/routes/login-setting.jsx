import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  BORDER_GRAY,
  BUTTON_SHADOW,
  MINSAPAY_BLUE,
  MINSAPAY_FONT,
} from "../components/theme-definition";
import LogOutRef from "../images/LogOut.svg";
import HomeIconRef from "../images/CPUHome.svg";
import { loginUtils } from "../features/login-feature";
import Loading from "../components/loading";

const OuterWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: white;
  position: relative; /* Set relative position */
`;

const IconsDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: absolute; /* Fix the icons div at the top */
  top: 0;
  left: 0;
  box-sizing: border-box;
`;

const TitleBetweenIcons = styled.span`
  font-size: 3vh;
  font-family: ${MINSAPAY_FONT};
  color: black;
  @media only screen and (max-width: 700px) {
    font-size: 3vh;
  }
`;

const TitleDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px; /* Add margin to avoid overlap with fixed icons */
  padding: 0 20px;
`;

const Title = styled.span`
  font-size: 4vh;
  @media only screen and (max-width: 1000px) {
    font-size: calc(0.3vw + 2em);
  }
  font-family: ${MINSAPAY_FONT};
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${MINSAPAY_FONT};
  box-sizing: border-box;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  width: 70%;
  font-size: 3vh;
  @media only screen and (max-width: 700px) {
    font-size: 2vh;
  }
  outline: none;
  border-bottom: 3px solid ${BORDER_GRAY};
  margin-top: 20px;
  font-family: ${MINSAPAY_FONT};

  &:focus {
    border-bottom: 3px solid #444;
  }
  &[name="password"],
  &[name="newPassword"] {
    font-family: sans-serif;
    &::placeholder {
      font-family: ${MINSAPAY_FONT};
    }
  }
  &[type="submit"] {
    margin-top: 20px;
    width: 60%;
    max-width: 300px;
    height: 40px;
    border-radius: 50px;
    border-bottom: 0px;
    background-color: ${MINSAPAY_BLUE};
    color: white;
    font-size: calc(0.6rem + 0.6vw); /* Adjust font size */
    /* Maximum font size */
    font-weight: normal;
    font-family: ${MINSAPAY_FONT};
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      box-shadow: 0px 2px 2px 0px ${BUTTON_SHADOW};
    }
  }
`;

const LogOutIcon = styled.img`
  height: 40px;
  width: 40px;
  aspect-ratio: 1;
  &:hover {
    cursor: pointer;
  }
`;

const ReturnHomeIcon = styled.img`
  height: 40px;
  width: 40px;
  aspect-ratio: 1;
  &:hover {
    cursor: pointer;
  }
`;

const Error = styled.span`
  font-size: 1.3vh;
  @media only screen and (max-width: 700px) {
    font-size: 2vh;
  }
  color: tomato;
  font-family: ${MINSAPAY_FONT};
  margin-top: 10px;
`;

export default function LoginSetting() {
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onLogOutIconClick = async (e) => {
    e.preventDefault();
    if (!confirm("로그아웃 하시겠습니까?")) return;
    await loginUtils.signOut();
    navigate("/login");
  };

  const onHomeIconClick = async (e) => {
    e.preventDefault();
    navigate("/");
  };

  const onSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setError("");
    if (
      newPassword === "" ||
      newPasswordCheck === "" ||
      currentPassword === ""
    ) {
      setIsLoading(false);
      return;
    }
    if (newPassword !== newPasswordCheck) {
      setIsLoading(false);
      setError("비밀번호와 비밀번호 확인이 일치하지 않습니다");
      return;
    }
    try {
      await loginUtils.changePassword(currentPassword, newPassword);
      setIsLoading(false);
      navigate("/"); // 비밀번호 변경 성공 시 홈으로 이동
    } catch {
      setIsLoading(false);
      setError(loginUtils.error);
    }
  };

  return (
    <OuterWrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <IconsDiv>
            <ReturnHomeIcon onClick={onHomeIconClick} src={HomeIconRef} />
            <TitleBetweenIcons>Setting</TitleBetweenIcons>
            <LogOutIcon onClick={onLogOutIconClick} src={LogOutRef} />
          </IconsDiv>
          <TitleDiv>
            <Title>비밀번호 변경</Title>
          </TitleDiv>
          <Form onSubmit={onSubmit}>
            <Input
              onChange={(e) => setCurrentPassword(e.target.value)}
              value={currentPassword}
              name="password"
              placeholder="Current Password"
              type="password"
              required
            />
            <Input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              name="password"
              placeholder="New Password"
              type="password"
              required
            />
            <Input
              onChange={(e) => setNewPasswordCheck(e.target.value)}
              value={newPasswordCheck}
              name="newPassword"
              placeholder="New Password Check"
              type="password"
              required
            />
            <Input type="submit" value={"비밀번호 변경"} />
          </Form>
          {error !== "" ? <Error>{error}</Error> : null}
        </>
      )}
    </OuterWrapper>
  );
}
