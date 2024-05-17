import styled from "styled-components";

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
`;

const Img = styled.img``;

const Text = styled.span``;

export default function MenuElement({ menu_name, price }) {
  return (
    <Wrapper>
      <Img />
      <Text>
        <p>{menu_name}</p>
        <p>{price}</p>
      </Text>
    </Wrapper>
  );
}
