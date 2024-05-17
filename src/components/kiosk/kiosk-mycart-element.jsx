import styled from "styled-components";

const SelectedWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

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

const ShoppingArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FoodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  border: 1px solid black;
  border-radius: 20px;
`;

function SelectedElement({ menuName, price }) {
  // Replace with appropriate image displaying logic
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

const Total = styled.div``; // Define styling for the total price

export default function MyCart() {
  return (
    <ShoppingArea>
      내 카트
      <SelectedElement menuName={"수제 햄버거"} price={4000} />
      <Total />
      <PayBtn>Pay!</PayBtn>
    </ShoppingArea>
  );
}
