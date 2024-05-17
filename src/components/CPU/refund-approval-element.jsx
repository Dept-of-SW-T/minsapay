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
  // needs css fixing
  width: 654px;
  height: 84.89px;
  border: 3px solid ${BORDER_GRAY};
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  padding-left: 0px;
  padding-right: 0.5%;
  background-color: ${REFUND_REQUEST};
`;

const Text = styled.span`
  font-family: "BMDOHYEON";
  font-size: 24px;
  width: 157px;
  border-right: 3px solid ${BORDER_GRAY};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  &#first-child {
    border-top-left-radius: 17px;
    border-bottom-left-radius: 17px;
  }
  &#approve-refund {
    &:hover {
      background-color: #eee;
      cursor: pointer;
    }
  }
`;

export default function RefundApprovalElement({
  menuName,
  userName,
  time,
  className,
}) {
  return (
    <Wrapper className={className === null ? "" : className}>
      <Text id="first-child">{menuName}</Text>
      <Text>{userName}</Text>
      <Text>{time}</Text>
      <Text id="approve-refund">승인하기</Text>
    </Wrapper>
  );
}
