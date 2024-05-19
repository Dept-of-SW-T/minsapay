import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
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
  return <Wrapper>{orders}</Wrapper>;
}
