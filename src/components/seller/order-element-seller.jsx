import styled from "styled-components";
import { useState } from "react";
import {
  BORDER_GRAY,
  ORDER_COMPLETE,
  ORDER_ONPROCESS,
  ORDER_REQUEST,
  REFUND_OR_RECEIPT_COMPLETE,
  MINSAPAY_TITLE,
} from "../theme-definition";
import { sellerFirebase } from "../../features/seller-firebase-interaction";

const Wrapper = styled.div`
  width: 90%;
  height: 60%;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const Text = styled.span`
  font-family: ${MINSAPAY_TITLE};
  font-size: 20px;
  @media only screen and (max-width: 768px) {
    font-size: 1.85vh;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
  padding: 10px;
  border-right: 1px solid ${BORDER_GRAY};
  flex: 1;
  height: 8vh;
  &:first-child {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }

  &:last-child {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    border-right: none;
  }

  &.refund-request {
    &:hover {
      background-color: #eee;
      cursor: pointer;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 15%;
`;

const StateButton = styled.div`
  width: 25px;
  @media only screen and (max-width: 768px) {
    width: 15px;
  }
  height: 25px;
  @media only screen and (max-width: 768px) {
    height: 15px;
  }
  background-color: ${(props) => props.backgroundColor || "white"};
  align-items: center;
  display: flex;
  border: 1px solid ${BORDER_GRAY};
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  margin: 0 5%;
`;

export default function OrderElementBuyer({
  menuName,
  status,
  id,
  processor,
  buyer,
}) {
  const [state, setState] = useState(status);
  const [processorState, setProcessorState] = useState(processor);

  const backgroundColor = () => {
    switch (status) {
      case "주문요청":
        return ORDER_REQUEST;
      case "처리중":
        return ORDER_ONPROCESS;
      case "처리완료":
        return ORDER_COMPLETE;
      default:
        return REFUND_OR_RECEIPT_COMPLETE;
    }
  };

  function stateToIndex(stateString) {
    switch (stateString) {
      case "주문요청":
        return 0;
      case "처리중":
        return 1;
      case "처리완료":
        return 2;
      default:
        return -1;
    }
  }

  function indexToState(stateIndex) {
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
    const nextState = indexToState(stateToIndex(state) - 1);
    if (nextState === "주문요청") {
      setProcessorState(null);
      sellerFirebase.setProcessor(id, null);
    }
    if (nextState === "NOSTATE") return;
    setState(nextState);
    statusChangeSync(nextState);
  }

  function onForwardClick() {
    const nextState = indexToState(stateToIndex(state) + 1);
    if (state === "주문요청") {
      setProcessorState(sellerFirebase.userDocData.username);
      sellerFirebase.setProcessor(id, sellerFirebase.userDocData.username);
    }
    if (nextState === "NOSTATE") return;
    setState(nextState);
    statusChangeSync(nextState);
  }

  return (
    <Wrapper style={{ backgroundColor: backgroundColor() }}>
      <FlexWrapper>
        <Text style={{ flexBasis: "20%" }}>{menuName}</Text>

        <Text style={{ flexBasis: "20%" }}>{buyer}</Text>
        <Text style={{ flexBasis: "20%" }}>
          {processorState === null ? " 처리자 없음" : processorState}
        </Text>
        <Text style={{ flexBasis: "20%" }}>{state}</Text>
      </FlexWrapper>
      <ButtonWrapper>
        {state !== "주문요청" && (
          <StateButton onClick={onBackwardClick}>{"<"}</StateButton>
        )}
        {state !== "처리완료" && (
          <StateButton onClick={onForwardClick}>{">"}</StateButton>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
}
