import styled from "styled-components";
import {
  BORDER_GRAY,
  ORDER_COMPLETE,
  ORDER_ONPROCESS,
  ORDER_REQUEST,
  REFUND_OR_RECEIPT_COMPLETE,
  MINSAPAY_FONT,
  REFUND_REQUEST,
} from "../theme-definition";
import { CPUFirebase } from "../../features/CPU-firebase-interaction";

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
  font-family: ${MINSAPAY_FONT};
  font-size: 1.2em;
  width: 18.5%;
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
  &.approve-refund {
    &:hover {
      background-color: #eee;
      cursor: pointer;
    }
  }
`;

export default function OrderElementCPU({
  menuName,
  userName,
  time,
  status,
  refundRequest,
  mode,
  id,
}) {
  // 주문 요청을 띄우는 element
  const backgroundColor = () => {
    switch (refundRequest) {
      case 1:
        return REFUND_REQUEST;
      case 2:
        return REFUND_OR_RECEIPT_COMPLETE;
      default: {
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
      }
    }
  };
  async function onClick(e) {
    if (mode === "refund") {
      if (!confirm("환불을 승인하시겠습니까?")) return;
      await CPUFirebase.refundOrder(e.target.id);
      alert("환불 승인 완료");
    }
  }
  return (
    <Wrapper style={{ backgroundColor: `${backgroundColor()}` }}>
      <Text id="first-child">{menuName}</Text>
      <Text>{userName}</Text>
      <Text>{time}</Text>
      <Text>{status}</Text>
      <Text
        className={
          mode === "refund" && refundRequest === 1 ? "approve-refund" : ""
        }
        id={id}
        onClick={mode === "refund" && refundRequest === 1 ? onClick : null}
      >
        {refundRequest == 0
          ? "특이사항 없음"
          : refundRequest == 1
            ? mode === "refund"
              ? "환불 승인"
              : "환불요청"
            : "환불완료"}
      </Text>
    </Wrapper>
  );
}
