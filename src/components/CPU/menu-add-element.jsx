import styled from "styled-components";
import { BORDER_GRAY } from "../theme-definition";
import AddMenuIcon from "../../images/AddMenu.svg";

const Wrapper = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 654px;
  height: 234px;
  border: 3px solid ${BORDER_GRAY};
  border-radius: 20px;
  background-color: white;
`;

const Img = styled.img`
  width: 80px;
  opacity: 0.4;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export default function MenuAddElement() {
  return (
    <Wrapper>
      <Img src={AddMenuIcon} />
    </Wrapper>
  );
}
