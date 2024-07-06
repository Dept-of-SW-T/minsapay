import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { buyerFirebase } from "../../features/buyer-firebase-interaction";
import LogOutRef from "../../images/CPUHome.svg";
import {
  MINSAPAY_FONT,
  MINSAPAY_TITLE,
} from "../../components/theme-definition";

const Wrapper = styled.div`
  width: 50vh;
  @media only screen and (max-aspect-ratio: 5 / 8) {
    width: 100vw;
  }
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PaymentBox = styled.div`
  height: 80%;
  @media only screen and (max-aspect-ratio: 5 / 8) {
    height: 100%;
    border-radius: 0;
  }
  width: 100%;
  background-color: white;
  border-radius: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const TitleDiv = styled.div`
  display: flex;
  gap: 20px;
  margin: 0 5%;
  justify-content: center;
  align-items: center;
  font-family: ${MINSAPAY_TITLE};
`;

const Title = styled.span`
  font-size: 10vh;
  @media only screen and (max-width: 2000px) {
    font-size: calc(0.3vw + 1.8em);
  }
  font-family: ${MINSAPAY_TITLE};
  text-align: center;
  margin: 10% auto;
`;

const FixedFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5vh;
  background-color: white;
`;

const HomeButton = styled.img`
  aspect-ratio: 1;
  height: 5vh;
  &:hover {
    cursor: pointer;
  }
  margin-bottom: 6vh;
`;

const charWidth = "1ch";
const gap = `calc(${charWidth} * 0.5)`;
const nChar = 5;
const inputWidth = `calc(${nChar} * (${charWidth} + ${gap}))`;

const KioskAuthenticationNumberInput = styled.input`
  display: block;
  margin-bottom: 25%;
  margin-left: auto;
  margin-right: auto;
  border: none;
  padding: 0;
  width: ${inputWidth};
  font-family: ${MINSAPAY_FONT};
  background: repeating-linear-gradient(
      90deg,
      dimgrey 0,
      dimgrey ${charWidth},
      transparent 0,
      transparent calc(${charWidth} + ${gap})
    )
    0 100% / calc(${inputWidth} - ${gap}) 4px no-repeat;
  font:
    8vh "Droid Sans Mono",
    "Consolas",
    monospace;
  letter-spacing: ${gap};

  &:focus {
    outline: none;
  }
  caret-color: transparent;
`;

const Form = styled.form`
  width: 85%;
  margin-bottom: 15%;
`;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 70%;
  font-family: ${MINSAPAY_FONT};
  margin-bottom: 3vh;
`;

const KeypadButton = styled.button`
  font: 4vh monospace;
  border: none;
  background-color: white;
  padding: auto;
  cursor: pointer;
  border-radius: 5vh;
`;

export default function BuyerPayment() {
  const navigate = useNavigate();
  const [kioskAuthenticationNumber, setKioskAuthenticationNumber] =
    useState("");
  const onKioskAuthenticationNumberChange = async (e) => {
    const isDigit = (char) => {
      return /\d/.test(char);
    };
    let isNumber = true;
    for (let i = 0; i < e.target.value.length; i++) {
      // 모든 character가 digit이어야만 true 반환
      isNumber = isNumber && isDigit(e.target.value[i]);
    }
    if (!isNumber) return; // 0~9가 아닌 input은 기록되지 않는다.
    if (e.target.value.length > 5) return;
    else setKioskAuthenticationNumber(e.target.value);
  };
  const onKioskAuthenticationNumberSumbit = async (e) => {
    e.preventDefault();
    const success = await buyerFirebase.submitKioskAuthenticationNumber(
      e.target[0].value,
    ); // 값 대조
    if (success) navigate("../buyer-home"); // 성공 시 이동 */
  };
  const onKeypadButtonClick = (e) => {
    setKioskAuthenticationNumber((prev) => {
      if (e.target.textContent === "C") return "";
      else if (prev.length === 5) return prev;
      else return prev + e.target.textContent;
    });
  };

  const blockArrowKey = (e) => {
    if (e.key.includes("Arrow")) e.preventDefault();
  };
  useEffect(() => {
    const init = async () => {
      await buyerFirebase.init();
    };
    init();
  }, []);
  return (
    <Wrapper>
      <PaymentBox>
        <TitleDiv>
          <Title>키오스크 결제 인증번호</Title>
        </TitleDiv>
        <Form onSubmit={onKioskAuthenticationNumberSumbit}>
          <KioskAuthenticationNumberInput
            onChange={onKioskAuthenticationNumberChange}
            onKeyDown={blockArrowKey}
            value={kioskAuthenticationNumber}
            type="text"
            id="priceState"
            autoComplete="off"
            autoFocus
            onBlur={(e) => e.target.focus()}
            inputMode="none"
            maxLength={5}
          />
          <GridBox>
            <KeypadButton type="button" onClick={onKeypadButtonClick}>
              1
            </KeypadButton>
            <KeypadButton type="button" onClick={onKeypadButtonClick}>
              2
            </KeypadButton>
            <KeypadButton type="button" onClick={onKeypadButtonClick}>
              3
            </KeypadButton>
            <KeypadButton type="button" onClick={onKeypadButtonClick}>
              4
            </KeypadButton>
            <KeypadButton type="button" onClick={onKeypadButtonClick}>
              5
            </KeypadButton>
            <KeypadButton type="button" onClick={onKeypadButtonClick}>
              6
            </KeypadButton>
            <KeypadButton type="button" onClick={onKeypadButtonClick}>
              7
            </KeypadButton>
            <KeypadButton type="button" onClick={onKeypadButtonClick}>
              8
            </KeypadButton>
            <KeypadButton type="button" onClick={onKeypadButtonClick}>
              9
            </KeypadButton>
            <KeypadButton type="button" onClick={onKeypadButtonClick}>
              C
            </KeypadButton>
            <KeypadButton type="button" onClick={onKeypadButtonClick}>
              0
            </KeypadButton>
            <KeypadButton type="submit">OK</KeypadButton>
          </GridBox>
        </Form>
      </PaymentBox>
      <FixedFooter>
        <HomeButton onClick={() => navigate("../buyer-home")} src={LogOutRef} />
      </FixedFooter>
    </Wrapper>
  );
}
