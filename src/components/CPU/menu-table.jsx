import { useState } from "react";
import styled from "styled-components";
import { MINSAPAY_TITLE, MINSAPAY_BLUE } from "../theme-definition";
import { CPUFirebase } from "../../features/CPU-firebase-interaction";

const Table = styled.table`
  width: 90%;
  max-width: 100vw;
  margin-top: 50px;
  margin-bottom: 50px;
  border-collapse: collapse;
  background-color: #fff;
  border: 1px solid #ccc;
  font-family: ${MINSAPAY_TITLE};
`;

const Th = styled.th`
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  font-size: 14px;
  position: sticky;
  top: 0;
  background-color: ${MINSAPAY_BLUE};
  color: white;
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  text-align: center;
  vertical-align: middle;
`;

const RefundButton = styled.button`
  padding: 5px 10px;
  font-size: 12px;
  color: white;
  background-color: #f44336;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
  text-align: center;

  &:hover {
    background-color: #e53935;
  }
`;

const RefundedEl = styled.span`
  padding: 5px 10px;
  font-size: 12px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 4px;
  margin: 0 5px;
  text-align: center;
`;

const LoadingEl = styled.span`
  padding: 5px 10px;
  font-size: 12px;
  color: white;
  background-color: #ff9800;
  border: none;
  border-radius: 4px;
  margin: 0 5px;
  text-align: center;
`;

export default function MenuTable({ orderList }) {
  const [loadingState, setLoadingState] = useState(orderList.map(() => false));

  async function onClick(index, id) {
    if (!confirm("환불을 승인하시겠습니까?")) return;

    setLoadingState((prev) => {
      const newLoadingState = [...prev];
      newLoadingState[index] = true;
      return newLoadingState;
    });

    await CPUFirebase.refundOrder(id);
    // alert("환불 승인 완료");

    setLoadingState((prev) => {
      const newLoadingState = [...prev];
      newLoadingState[index] = false;
      return newLoadingState;
    });
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>No.</Th>
          <Th>메뉴</Th>
          <Th>주문자명</Th>
          <Th>시간</Th>
          <Th>상태</Th>
          <Th>환불</Th>
        </tr>
      </thead>
      <tbody>
        {orderList.map((order, index) => (
          <tr key={index}>
            <Td>{order.id}</Td>
            <Td>{order.menu_name}</Td>
            <Td>{order.buyer_name}</Td>
            <Td>{order.reception_time}</Td>
            <Td>{order.current_state}</Td>
            <Td>
              {order.refund_request === 0 ? (
                loadingState[index] ? (
                  <LoadingEl>로딩중...</LoadingEl>
                ) : (
                  <RefundButton onClick={() => onClick(index, order.order_id)}>
                    환불하기
                  </RefundButton>
                )
              ) : (
                <RefundedEl>환불됨</RefundedEl>
              )}
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
