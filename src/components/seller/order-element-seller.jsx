import styled from "styled-components";
import { useState } from "react";
import {
  BORDER_GRAY,
  ORDER_COMPLETE,
  ORDER_ONPROCESS,
  ORDER_REQUEST,
  REFUND_OR_RECEIPT_COMPLETE,
  REFUND_REQUEST,
} from "../theme-definition";
import { sellerFirebase } from "../../features/seller-firebase-interaction";

const Wrapper = styled.div`
  width: 96%;
  height: 7vw;
  border: 3px solid ${BORDER_GRAY};
  border-radius: 20px;
  padding-left: 0px;
  padding-right: 0.5%;
`;
const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Text = styled.span`
  font-family: "BMDOHYEON";
  font-size: 1em;
  /* width: 23.5%; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
  &.refund-request {
    &:hover {
      background-color: #eee;
      cursor: pointer;
    }
  }
`;

const VerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 23.5%;
  background-color: white;
`;

const StateButton = styled.div`
  width: 10%;
  background-color: white;
  align-items: center;
  display: flex;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

export default function OrderElementBuyer({
  menuName,
  status,
  id,
  processor,
  buyer,
  receptionTime,
}) {
  const [state, setstate] = useState(status);
  const backgroundColor = () => {
    switch (state) {
      case "주문요청":
        return ORDER_REQUEST;
      case "처리중":
        return ORDER_ONPROCESS;
      case "처리완료":
        return ORDER_COMPLETE;
      case "환불요청":
        return REFUND_REQUEST;
      default:
        return REFUND_OR_RECEIPT_COMPLETE;
    }
  };
  // async function onClick(e) {
  //   if (!confirm("환불을 요청하시겠습니까?")) return;
  //   else {
  //     await buyerFirebase.refundRequest(e.target.id);
  //   }
  // }
  function stateToIndex(stateString) {
    switch (stateString) {
      case "주문요청":
        return 0;
      case "처리중":
        return 1;
      case "처리완료":
        return 2;
    }
  }
  function indexTostate(stateIndex) {
    switch (stateIndex) {
      case 0:
        return "주문요청";
      case 1:
        return "처리중";
      case 2:
        return "처리완료";
      default:
        return "NOSTATE";
    }
  }

  async function statusChangeSync(nextState) {
    await sellerFirebase.setStatus(id, nextState);
  }

  function onBackwardClick() {
    const nextState = indexTostate(stateToIndex(state) - 1);
    if (nextState === "NOSTATE") return;
    setstate(nextState);
    statusChangeSync(nextState);
  }

  function onForwardClick() {
    const nextState = indexTostate(stateToIndex(state) + 1);
    if (nextState === "NOSTATE") return;
    setstate(nextState);
    statusChangeSync(nextState);
  }

  return (
    <Wrapper style={{ backgroundColor: `${backgroundColor(state)}` }}>
      <FlexWrapper>
        <Text id="first-child">{buyer}</Text>
        <VerticalWrapper>
          <Text>{menuName}</Text>
          <Text>{receptionTime}</Text>
        </VerticalWrapper>
        <Text>{state}</Text>
        <Text>{processor === null ? "없음" : processor}</Text>
        {state === "주문요청" ? null : (
          <StateButton onClick={onBackwardClick}>{"<"}</StateButton>
        )}
        <StateButton onClick={onForwardClick}>{">"}</StateButton>
      </FlexWrapper>
    </Wrapper>
  );
}
