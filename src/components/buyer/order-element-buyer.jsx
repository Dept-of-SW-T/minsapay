import styled from "styled-components";
import {
  BORDER_GRAY,
  ORDER_COMPLETE,
  ORDER_ONPROCESS,
  ORDER_REQUEST,
  REFUND_OR_RECEIPT_COMPLETE,
} from "../theme-definition";

const Wrapper = styled.span`
  width: 96%;
  height: 11vh;
  @media only screen and (width: 700px) {
    height: 8vh;
  }
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  padding-left: 0px;
  padding-right: 0.5%;
`;

const Text = styled.span`
  font-family: "TheJamsil";
  font-size: 1.2em;
  @media only screen and (width: 700px) {
    font-size: 0.9em;
  }
  width: 22.5%;
  border-right: 2px solid ${BORDER_GRAY};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
  margin-top: 1.5%;
  margin-bottom: 1.5%;
  transition: background-color 0.3s ease;
  padding: 2px;

  &:first-child {
    margin-left: auto;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    margin-right: auto;
    border-right: 0px solid ${BORDER_GRAY};
  }
`;

export default function OrderElementBuyer({
  menuName,
  teamName,
  price,
  status,
  refundRequest,
}) {
  const displayStatus = refundRequest === 1 ? "환불됨" : status;
  const backgroundColor = () => {
    switch (displayStatus) {
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

  return (
    <Wrapper style={{ backgroundColor: `${backgroundColor()}` }}>
      <Text id="first-child">{teamName}</Text>
      <Text>{menuName}</Text>
      <Text className="price">{price}원</Text>
      <Text id="last-child">{displayStatus}</Text>
    </Wrapper>
  );
}
