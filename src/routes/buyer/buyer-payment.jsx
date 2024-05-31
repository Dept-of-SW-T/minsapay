import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { buyerFirebase } from "../../features/buyer-firebase-interaction";

const KioskAuthenticationNumber = styled.input``;

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
    console.log(e.target[0].value);
    const success = await buyerFirebase.submitKioskAuthenticationNumber(
      e.target[0].value,
    ); // 값 대조
    if (success) navigate("../buyer-home"); // 성공 시 이동 */
  };
  useEffect(() => {
    const init = async () => {
      await buyerFirebase.init();
    };
    init();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <p>Buyer Payment</p>

      <form onSubmit={onKioskAuthenticationNumberSumbit}>
        <KioskAuthenticationNumber
          onChange={onKioskAuthenticationNumberChange}
          value={kioskAuthenticationNumber}
          type="text"
          id="priceState"
        />
      </form>

      <button onClick={() => navigate("../buyer-home")}>To Buyer Home</button>
    </div>
  );
}
