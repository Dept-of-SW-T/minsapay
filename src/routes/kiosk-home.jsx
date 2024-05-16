import styled from "styled-components";
import { auth } from "../features/login-feature";

const MenuArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShoppingArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div``;

const FoodWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectedWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Total = styled.div``;

const XBtn = styled.button`
  background-color: white;
  border: 0;
`;

const ColoredText = styled.div`
  color: skyblue;
  font-size: small;
`;

const PayBtn = styled.button`
  background-color: skyblue;
  border-radius: 20px;
`;

function FoodElement({ menuName, price }) {
  return (
    <FoodWrapper>
      <img />
      <div>{menuName}</div>
      <ColoredText>{price}원</ColoredText>
    </FoodWrapper>
  );
}

function SelectedElement({ menuName, price }) {
  return (
    <SelectedWrapper>
      <img />
      <FoodWrapper>
        <p>{menuName}</p>
        <ColoredText>{price}원</ColoredText>
      </FoodWrapper>
      <XBtn>X</XBtn>
    </SelectedWrapper>
  );
}

export default function KioskHome() {
  return (
    <>
      <MenuArea>
        Store - {auth.currentUser.userID}
        <Title>{auth.currentUser.username}</Title>
        메뉴
        <FoodElement menuName={"수제 햄버거"} price={4000} />
        <FoodElement menuName={"감자튀김"} price={4000} />
      </MenuArea>
      <ShoppingArea>
        내 카트
        <SelectedElement menuName={"수제 햄버거"} price={4000} />
        <Total />
        <PayBtn>Pay!</PayBtn>
      </ShoppingArea>
    </>
  );
}
