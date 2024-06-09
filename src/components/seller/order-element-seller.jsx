import styled from "styled-components";
import {
  BORDER_GRAY,
  ORDER_COMPLETE,
  ORDER_ONPROCESS,
  ORDER_REQUEST,
  REFUND_OR_RECEIPT_COMPLETE,
  REFUND_REQUEST,
} from "../theme-definition";
// import { sellerFirebase } from "../../features/seller-firebase-interaction";

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
  font-size: 1em;
  /* width: 23.5%; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
  padding: 0 2%;
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

export default function OrderElementBuyer({
  menuName,
  status,
  // id,
  processor,
  buyer,
  receptionTime,
}) {
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
  // async function onClick(e) {
  //   if (!confirm("환불을 요청하시겠습니까?")) return;
  //   else {
  //     await buyerFirebase.refundRequest(e.target.id);
  //   }
  // }
  return (
    <Wrapper style={{ backgroundColor: `${backgroundColor(status)}` }}>
      <Text id="first-child">{buyer}</Text>
      <Text>{menuName}</Text>
      <VerticalWrapper>
        <Text>{menuName}</Text>
        <Text>{receptionTime}</Text>
      </VerticalWrapper>
      <Text>{status}</Text>
      <Text>{processor === null ? "없음" : processor}</Text>
    </Wrapper>
  );
}
