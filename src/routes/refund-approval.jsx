import styled from "styled-components";
import { Header } from "../components/CPU/cpu-header";
import CoupleList from "../components/CPU/couple-list";
import RefundApprovalElement from "../components/CPU/refund-approval-element";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RefundApprovalBox = styled.div`
  width: 1355px;
  margin-top: 20px;
`;
export default function RefundApproval() {
  const refundRequestList = [
    <RefundApprovalElement
      menuName="해물라면"
      userName="최정욱"
      time="15:44:35"
      key={1}
    />,
    <RefundApprovalElement
      menuName="조유찬"
      userName="닭발"
      time="15:44:30"
      key={2}
    />,
    <RefundApprovalElement
      menuName="컵라면"
      userName="이예안"
      time="15:44:25"
      key={3}
    />,
    <RefundApprovalElement
      menuName="컵라면"
      userName="이예안"
      time="15:44:25"
      key={4}
    />,
    <RefundApprovalElement
      menuName="컵라면"
      userName="이예안"
      time="15:44:25"
      key={5}
    />,
  ];
  return (
    <Wrapper>
      <Header />
      <RefundApprovalBox>
        <CoupleList dataList={refundRequestList} />
      </RefundApprovalBox>
    </Wrapper>
  );
}
