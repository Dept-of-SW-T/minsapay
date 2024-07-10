import styled from "styled-components";
import { MINSAPAY_TITLE } from "../theme-definition";

export default function MenuTable({ orderList }) {
  const Table = styled.table`
    width: 90%;
    max-width: 800px;
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
  `;

  return (
    <Table>
      <thead>
        <tr>
          <Th>메뉴</Th>
          <Th>주문자명</Th>
          <Th>시간</Th>
          <Th>상태</Th>
          <Th>환불</Th>
        </tr>
      </thead>
      <tbody>{orderList}</tbody>
    </Table>
  );
}
