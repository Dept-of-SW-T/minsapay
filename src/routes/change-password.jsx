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
  height: 100vh; /* 전체 화면 높이 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 세로로도 가운데 정렬 */
  padding: 20px; /* 모바일에서 여백을 추가 */
  box-sizing: border-box;
`;

const LogOutIcon = styled.img`
  height: 40px;
  width: 40px; /* 고정 크기 */
  aspect-ratio: 1;
  margin-left: 10px; /* 제목과의 간격 조정 */
  &:hover {
    cursor: pointer;
  }
`;

const TitleDiv = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center; /* 가운데 정렬 */
  align-items: center;
  padding: 0 20px; /* 좌우 여백 추가 */
`;

const Title = styled.span`
  font-size: 6vh;
  @media only screen and (max-width: 1000px) {
    font-size: calc(0.3vw + 2em);
  }
  font-family: ${MINSAPAY_FONT};
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px; /* 최대 너비 설정 */
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
  width: 100%;
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
    width: 100%;
    max-width: 300px; /* 최대 너비 설정 */
    height: 40px;
    border-radius: 50px;
    border-bottom: 0px;
    background-color: ${MINSAPAY_BLUE};
    color: white;
    font-size: 2vh;
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
  height: 40px;
  width: 40px; /* 고정 크기 */
  aspect-ratio: 1;
  margin-right: 10px; /* 제목과의 간격 조정 */
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
  margin-top: 10px; /* 에러 메시지의 상단 여백 추가 */
`;

export default function ChangePassword() {
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
    navigate("../login");
  };
  const onHomeIconClick = async (e) => {
    e.preventDefault();
    navigate("../");
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
        </>
      )}
    </OuterWrapper>
  );
}
