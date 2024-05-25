import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function OrderList({ orders }) {
  // order-element-kiosk를 나열하는 리스트
  return <Wrapper>{orders}</Wrapper>;
}
