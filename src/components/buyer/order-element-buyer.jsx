import styled from "styled-components";
import {
  BORDER_GRAY,
  ORDER_COMPLETE,
  ORDER_ONPROCESS,
  ORDER_REQUEST,
  REFUND_OR_RECEIPT_COMPLETE,
  REFUND_REQUEST,
} from "../theme-definition";

const Wrapper = styled.span`
  width: 96%;
  height: 7vw;
  border: 3px solid ${BORDER_GRAY};
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  padding-left: 0px;
  padding-right: 0.5%;
`;

const Text = styled.span`
  font-family: "BMDOHYEON";
  font-size: 1.2em;
  width: 23.5%;
  border-right: 3px solid ${BORDER_GRAY};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
  &#first-child {
    border-top-left-radius: 17px;
    border-bottom-left-radius: 17px;
  }
  &#refund-request {
    &:hover {
      background-color: #eee;
      cursor: pointer;
    }
  }
`;

export default function OrderElementBuyer({
  menuName,
  userName,
  price,
  status,
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
      case "환불요청":
        return REFUND_REQUEST;
      default:
        return REFUND_OR_RECEIPT_COMPLETE;
    }
  };
  function onClick() {
    if (!confirm("환불을 요청하시겠습니까?")) return;
    else {
      // 환불 요청 관련 무언가
      console.log(id);
    }
  }
  return (
    <Wrapper style={{ backgroundColor: `${backgroundColor(status)}` }}>
      <Text id="first-child">{menuName}</Text>
      <Text>{userName}</Text>
      <Text>{price}원</Text>
      <Text onClick={onClick} id="refund-request">
        환불요청하기
      </Text>
    </Wrapper>
  );
}
