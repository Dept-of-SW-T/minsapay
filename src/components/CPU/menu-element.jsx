import styled from "styled-components";
import { BORDER_GRAY } from "../theme-definition";

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  width: 654px;
  height: 234px;
  border: 3px solid ${BORDER_GRAY};
  border-radius: 20px;
`;

const Img = styled.img``;

const Text = styled.span``;

export default function MenuElement({ image_url, menu_name, price }) {
  return (
    <Wrapper>
      <Img src={image_url} />
      <Text>
        <p>{menu_name}</p>
        <p>{price}</p>
      </Text>
    </Wrapper>
  );
}
