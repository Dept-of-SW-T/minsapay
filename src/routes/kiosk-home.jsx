import styled from "styled-components";
/*import { auth } from "../features/login-feature";
import { BORDER_GRAY } from "../components/theme-definition";*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  justify-content: space-between;
  font-family: "BMDOHYEON";
  padding: 3vh;
`;

const MenuArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
`;
/*
const FoodArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const ShoppingArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.div`
  width: 70vw;
  height: 15vh;
  border: 3px solid ${BORDER_GRAY};
  border-radius: 20px;
  background-size: cover;
  background-size: center;
`;

const SecondaryTitle = styled.div`
  margin-bottom: 10px;
`;

const FoodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  border: 1px solid black;
  border-radius: 20px;
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

const FoodImg = styled.img`
  width: 20vw;
  height: 15vh;
`;

const FoodTag = styled.div`
  padding-left: 2vw;
`;

function FoodElement({ menuName, price, imageLink }) {
  return (
    <FoodWrapper>
      <FoodImg src={imageLink} />
      <FoodTag>
        <div>{menuName}</div>
        <ColoredText>{price}원</ColoredText>
      </FoodTag>
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
    <Wrapper>
      <MenuArea>
        <SecondaryTitle>Store - {auth.currentUser.userID}</SecondaryTitle>
        <Title>{auth.currentUser.username}</Title>
        메뉴
        <FoodArea>
          <FoodElement menuName={"수제 햄버거"} price={4000} />
          <FoodElement menuName={"감자튀김"} price={4000} />
        </FoodArea>
      </MenuArea>
      <ShoppingArea>
        내 카트
        <SelectedElement menuName={"수제 햄버거"} price={4000} />
        <Total />
        <PayBtn>Pay!</PayBtn>
      </ShoppingArea>
    </Wrapper>
  );
}
*/

import Banner from "../components/kiosk/kiosk-banner-element.jsx";
import FoodElement from "../components/kiosk/kiosk-menu-element.jsx";
import MyCart from "../components/kiosk/kiosk-mycart-element.jsx";

export default function KioskHome() {
  return (
    <Wrapper>
      <Banner />
      <MenuArea>
        메뉴
        <FoodElement
          menuName={"수제 햄버거"}
          price={4000}
          imageLink={"image1.jpg"}
        />{" "}
        {/* Add image link */}
        <FoodElement
          menuName={"감자튀김"}
          price={2000}
          imageLink={"image2.jpg"}
        />{" "}
        {/* Add image link */}
      </MenuArea>
      <MyCart />
    </Wrapper>
  );
}
