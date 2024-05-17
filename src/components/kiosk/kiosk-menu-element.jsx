export default function KioskMenuElement() {
  return <></>;
}
import styled from "styled-components";

const FoodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  border: 1px solid black;
  border-radius: 20px;
`;

const FoodImg = styled.img`
  width: 20vw;
  height: 15vh;
`;

const FoodTag = styled.div`
  padding-left: 2vw;
`;

const ColoredText = styled.div`
  color: skyblue;
  font-size: small;
`;

export function FoodElement({ menuName, price, imageLink }) {
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
