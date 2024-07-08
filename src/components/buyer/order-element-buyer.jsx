import styled from "styled-components";
import {
  BORDER_GRAY,
  ORDER_COMPLETE,
  ORDER_ONPROCESS,
  ORDER_REQUEST,
  REFUND_OR_RECEIPT_COMPLETE,
  REFUND_REQUEST,
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
  cursor: pointer; /* 마우스 포인터 모양으로 변경 */
  transition: background-color 0.3s ease; /* 호버 시 부드러운 애니메이션 효과 */

  /* 첫 번째 요소에만 적용되는 스타일 */
  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    padding-left: 10px; /* 좌측 여백 추가 */
  }
  &:price {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    padding-left: 10px; /* 좌측 여백 추가 */
  }
  /* 환불 요청 버튼 스타일 */
  &.refund-request {
    background-color: #f44336; /* 배경색 */
    color: white; /* 글자색 */
    border: 2px solid transparent; /* 테두리 */
    padding: 8px 16px; /* 내부 여백 */
    border-radius: 18px; /* 모서리 둥글게 */
    text-transform: uppercase; /* 대문자 변환 */
    margin-left: 0.5vh;
    margin-top: 0.5vh;
    margin-bottom: 0.5vh;
    outline: none; /* 포커스 테두리 제거 */
    width: 35px;

    &:hover {
      background-color: #d32f2f; /* 호버 시 배경색 변경 */
    }

    &:active {
      background-color: #b71c1c; /* 클릭 시 배경색 변경 */
    }
  }
`;

export default function OrderElementBuyer({
  menuName,
  teamName,
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
      <Text className="price">{price}원</Text>
      {status === "환불완료" ? (
        <Text>환불 완료됨</Text>
      ) : status === "환불요청" ? (
        <Text>환불 요청됨</Text>
      ) : (
        <Text onClick={onClick} className="refund-request" id={id}>
          환불 요청
        </Text>
      )}
    </Wrapper>
  );
}
