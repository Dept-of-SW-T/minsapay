import styled from "styled-components";
import { BORDER_GRAY } from "../theme-definition";

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  width: 654px;
  height: 234px;
  border: 3px solid ${BORDER_GRAY};
  border-radius: 20px;
  background-color: white;
`;

const Img = styled.img`
  aspect-ratio: 1;
  border-top-left-radius: 17px;
  border-bottom-left-radius: 17px;
`;

const TextDiv = styled.span`
  width: 431px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 49px;
`;
const Text = styled.span`
  width: 100%;
  font-family: "BMDOHYEON";
  font-size: 30px;
  text-align: center;
`;

export default function MenuElement({ image_url, menu_name, price }) {
  return (
    <Wrapper>
      <Img src={image_url} />
      <TextDiv>
        <Text>메뉴명: {menu_name}</Text>
        <Text>가격: {price}원</Text>
      </TextDiv>
    </Wrapper>
  );
}
