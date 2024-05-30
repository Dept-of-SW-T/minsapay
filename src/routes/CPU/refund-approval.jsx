import styled from "styled-components";
import { Header } from "../../components/CPU/cpu-header";
import CoupleList from "../../components/CPU/couple-list";
// import RefundApprovalElement from "../../components/CPU/refund-approval-element";
import OrderElementCPU from "../../components/CPU/order-element-CPU";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RefundApprovalBox = styled.div`
  width: 100%;
  margin-top: 4vh;
`;
export default function RefundApproval() {
  const refundRequestList = [
    <OrderElementCPU
      menuName="해물라면"
      userName="최정욱"
      time="15:44:35"
      status={"승인하기"}
      key={1}
    />,
    <OrderElementCPU
      menuName="조유찬"
      userName="닭발"
      time="15:44:30"
      status={"승인하기"}
      key={2}
    />,
    <OrderElementCPU
      menuName="컵라면"
      userName="이예안"
      time="15:44:25"
      status={"승인하기"}
      key={3}
    />,
    <OrderElementCPU
      menuName="컵라면"
      userName="이예안"
      time="15:44:25"
      status={"승인하기"}
      key={4}
    />,
    <OrderElementCPU
      menuName="컵라면"
      userName="이예안"
      time="15:44:25"
      status={"승인하기"}
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
