import styled from "styled-components";
import {
  BORDER_GRAY,
  ORDER_COMPLETE,
  ORDER_ONPROCESS,
  ORDER_REQUEST,
  REFUND_OR_RECEIPT_COMPLETE,
} from "../theme-definition";
import { buyerFirebase } from "../../features/buyer-firebase-interaction";

const Wrapper = styled.span`
  width: 96%;
  height: 7vh;
  border: 2px solid ${BORDER_GRAY};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  padding-left: 0px;
  padding-right: 0.5%;
`;

const Text = styled.span`
  font-family: "TheJamsil";
  font-size: 0.9em;
  width: 23.5%;
  border-right: 2px solid ${BORDER_GRAY};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
  &#first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  &.refund-request {
    &:hover {
      background-color: #eee;
      cursor: pointer;
    }
  }
`;

export default function OrderElementBuyer({
  menuName,
  teamName,
  price,
  status,
  refundRequest,
  id,
}) {
  // 주문 요청을 띄우는 element
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
  async function onClick(e) {
    if (!confirm("환불을 요청하시겠습니까?")) return;
    else {
      await buyerFirebase.refundRequest(e.target.id);
    }
  }
  return (
    <Wrapper style={{ backgroundColor: `${backgroundColor(status)}` }}>
      <Text id="first-child">{teamName}</Text>
      <Text>{menuName}</Text>
      <Text>{price}원</Text>
      {refundRequest === 2 ? (
        <Text>환불 완료됨</Text>
      ) : refundRequest === 1 ? (
        <Text>환불 요청됨</Text>
      ) : (
        <Text onClick={onClick} className="refund-request" id={id}>
          환불 요청
        </Text>
      )}
    </Wrapper>
  );
}
