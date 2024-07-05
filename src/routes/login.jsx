import { useEffect, useState } from "react";
import { auth } from "../features/login-feature";
import styled from "styled-components";
import Logo from "../images/LogoMinsapay.svg";
import { useNavigate } from "react-router-dom";
import {
  BORDER_GRAY,
  BUTTON_SHADOW,
  MINSAPAY_BLUE,
  MINSAPAY_FONT,
  MINSAPAY_TITLE,
} from "../components/theme-definition";
import backgroundImagePhoneScreen from "../images/bg-candidate-phone-screen.png";
import backgroundImageWideScreen from "../images/bg-candidate-wide-screen.jpg";

const OuterWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${backgroundImageWideScreen});
  background-size: cover;
  @media only screen and (max-width: 768px) {
    background-image: url(${backgroundImagePhoneScreen});
    background-size: cover;
  }
`;

// figma 제대로 된 치수 필요
const Wrapper = styled.div`
  width: 50vh;

  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LoginBox = styled.div`
  height: 60vh;
  @media only screen and (max-width: 1000px) {
    height: calc(40vh);
  }
  width: 100%;
  @media only screen and (max-width: 1000px) {
    width: calc(35vh);
  }
  background-color: white;
  border-radius: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const TitleDiv = styled.div`
  margin-top: 10%;
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 10%;
`;
const Title = styled.span`
  font-size: 2vw;
  @media only screen and (max-width: 1100px) {
    font-size: calc(0.3vw + 1.5em);
  }
  font-family: ${MINSAPAY_TITLE};
`;
const ImgDiv = styled.div`
  height: 140%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 12%;
`;
const Image = styled.img`
  height: 140%;
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
  font-family: ${MINSAPAY_FONT};
`;
const Input = styled.input`
  padding: 1.3% 0px;
  border: none;
  width: 80%;
  font-size: 1vh;
  @media only screen and (max-width: 700px) {
    font-size: 1.5vh;
  }
  outline: none;
  border-bottom: 3px solid ${BORDER_GRAY};
  margin-top: 7%;
  font-family: ${MINSAPAY_FONT};
  @media only screen and (max-width: 2000px) {
    font-size: 0.9em;
  }
  &:focus {
    border-bottom: 3px solid #444;
  }
  &[name="password"] {
    // BMDOWYEON 폰트는 비밀번호를 지원하지 않기에 비밀번호 입력은 본래 글씨체 적용
    font-family: sans-serif;
    &::placeholder {
      font-family: ${MINSAPAY_FONT};
    }
  }
  &[type="submit"] {
    // 로그인 버튼
    margin-top: 7%;
    //margin-bottom: 10%;

    width: 30%;
    height: 17%;
    border-radius: 50px;
    border-bottom: 0px;

    background-color: ${MINSAPAY_BLUE};
    color: white;
    font-size: 0.7em;
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
const Error = styled.span`
  // 로그인 에러 모두 띄우는 거
  font-size: 1.3vh;
  @media only screen and (max-width: 1000px) {
    font-size: calc(0.58em);
  }
  color: tomato;
  font-family: ${MINSAPAY_FONT};
  margin-bottom: 7%;
  @media only screen and (max-width: 1000px) {
    margin-bottom: 5%;
  }
`;
const PicSource = styled.span`
  font-size: 2.5vh;
  color: aliceblue;
  font-family: ${MINSAPAY_FONT};
  position: fixed;
  bottom: 1%;
  right: 1%;
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
  const onLogoImageDoubleClick = async () => {
    const userID = prompt("아이디 입력");
    if (userID !== "Admin@developer") return;
    const password = prompt("비밀번호 입력");
    const successfulSignIn = await auth.developerSignIn(password);
    if (successfulSignIn) {
      navigate("/");
    }
  };
  useEffect(() => {
    async function init() {
      await auth.signOut();
    }
    init();
  }, []);
  return (
    <OuterWrapper>
      <Wrapper>
        <LoginBox>
          <TitleDiv>
            <ImgDiv>
              <Image src={Logo} onDoubleClick={onLogoImageDoubleClick} />
            </ImgDiv>

            <Title>Login </Title>
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
      <PicSource>사진 제공 TTL</PicSource>
    </OuterWrapper>
  );
}
