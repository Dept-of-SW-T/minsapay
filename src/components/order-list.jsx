import styled from "styled-components";
import OrderElement from "./order-element";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function OrderList() {
  return (
    <Wrapper>
      <OrderElement
        menuName={"해물라면"}
        userName={"이감찬"}
        time={"15:58:45"}
        status={"처리 중"}
      />
      <OrderElement
        menuName={"해물라면"}
        userName={"이감찬"}
        time={"15:45:45"}
        status={"처리 중"}
      />
      <OrderElement
        menuName={"해물라면"}
        userName={"이감찬"}
        time={"15:45:45"}
        status={"처리 중"}
      />
    </Wrapper>
  );
}
