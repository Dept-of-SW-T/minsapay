import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  BORDER_GRAY,
  BUTTON_SHADOW,
  MINSAPAY_BLUE,
  MINSAPAY_FONT,
} from "../../components/theme-definition";
import LogOutRef from "../../images/LogOut.svg";
import HomeIconRef from "../../images/CPUHome.svg";
import { loginUtils } from "../../features/login-feature";

const OuterWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LogOutIcon = styled.img`
  height: 80%;
  /* margin-right: 11px; */
  aspect-ratio: 1;
  /* margin-left: auto; */
  &:hover {
    cursor: pointer;
  }
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
  font-size: 7vw;
  @media only screen and (max-width: 1000px) {
    font-size: calc(0.3vw + 2em);
  }
  font-family: ${MINSAPAY_FONT};
`;

const Form = styled.form`
  height: 50%;
  padding-top: 20%;
  margin-bottom: 1.6%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: ${MINSAPAY_FONT};
`;

const Input = styled.input`
  padding: 1.3% 0px;
  border: none;
  width: 80%;
  font-size: 3vh;
  @media only screen and (max-width: 700px) {
    font-size: 2vh;
  }
  outline: none;
  border-bottom: 3px solid ${BORDER_GRAY};
  margin-top: 7%;
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
    margin-top: 7%;
    width: 20%;
    @media only screen and (max-width: 700px) {
      width: 25%;
    }
    height: 10%;
    @media only screen and (max-width: 700px) {
      height: 12%;
    }
    border-radius: 50px;
    border-bottom: 0px;
    background-color: ${MINSAPAY_BLUE};
    color: white;
    font-size: 3vh;
    @media only screen and (max-width: 700px) {
      font-size: calc(0.07vw + 0.78em);
    }
    font-weight: normal;
    font-family: ${MINSAPAY_FONT};
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      box-shadow: 0px 2px 2px 0px ${BUTTON_SHADOW};
    }
  }
`;

const ReturnHomeIcon = styled.img`
  height: 80%;
  /* margin-right: 11px; */
  aspect-ratio: 1;
  /* margin-left: auto; */
  &:hover {
    cursor: pointer;
  }
`;
const Error = styled.span`
  font-size: 1.3vh;
  @media only screen and (max-width: 700px) {
    font-size: calc(0.58em);
  }
  color: tomato;
  font-family: ${MINSAPAY_FONT};
  margin-bottom: 4%;
`;

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onLogOutIconClick = async (e) => {
    e.preventDefault();
    if (!confirm("로그아웃 하시겠습니까?")) return;
    await loginUtils.signOut();
    navigate("../login");
  };
  const onHomeIconClick = async (e) => {
    e.preventDefault();
    navigate("../buyer-home");
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword === "" || newPasswordCheck === "" || currentPassword === "")
      return;
    if (newPassword !== newPasswordCheck) {
      setError("비밀번호와 비밀번호 확인이 일치하지 않습니다");
      return;
    }
    try {
      await loginUtils.changePassword(currentPassword, newPassword);
      navigate("/"); // 비밀번호 변경 성공 시 홈으로 이동
    } catch {
      setError(loginUtils.error);
    }
  };

  return (
    <OuterWrapper>
      <TitleDiv>
        <ReturnHomeIcon onClick={onHomeIconClick} src={HomeIconRef} />
        <Title>비밀번호 변경</Title>
        <LogOutIcon onClick={onLogOutIconClick} src={LogOutRef} />
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
    </OuterWrapper>
  );
}
