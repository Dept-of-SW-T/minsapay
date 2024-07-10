import styled from "styled-components";
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
  font-size: 15px;
  @media only screen and (max-width: 768px) {
    font-size: 1.7vh;
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
  console.log(processor, status);

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
      case 3:
        return "수령완료";
      default:
        return "NOSTATE";
    }
  }

  async function statusChangeSync(nextState) {
    await sellerFirebase.setStatus(id, nextState);
  }

  async function onBackwardClick() {
    const nextState = indexToState(stateToIndex(status) - 1);
    if (nextState === "NOSTATE") return;
    await statusChangeSync(nextState);
    if (nextState === "주문요청") {
      await sellerFirebase.setProcessor(id, null);
    } else {
      await sellerFirebase.setProcessor(
        id,
        sellerFirebase.userDocData.username,
      );
    }
  }

  async function onForwardClick() {
    const nextState = indexToState(stateToIndex(status) + 1);
    if (nextState === "NOSTATE") return;
    if (nextState === "수령완료") {
      if (!confirm("주문상태를 변경을 완료하시겠습니까?")) return;
      await sellerFirebase.setProcessor(id, null);
    } else {
      await sellerFirebase.setProcessor(
        id,
        sellerFirebase.userDocData.username,
      );
    }
    await statusChangeSync(nextState);
  }

  return (
    <Wrapper style={{ backgroundColor: backgroundColor() }}>
      <FlexWrapper>
        <Text style={{ flexBasis: "20%" }}>{menuName}</Text>

        <Text style={{ flexBasis: "20%" }}>{buyer}</Text>
        <Text style={{ flexBasis: "20%" }}>
          {processor === null ? "처리자 없음" : processor}
        </Text>
        <Text style={{ flexBasis: "20%" }}>{status}</Text>
      </FlexWrapper>
      <ButtonWrapper>
        {status !== "주문요청" && status !== "수령완료" && (
          <StateButton onClick={onBackwardClick}>{"<"}</StateButton>
        )}
        {status !== "수령완료" && (
          <StateButton onClick={onForwardClick}>{">"}</StateButton>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
}
