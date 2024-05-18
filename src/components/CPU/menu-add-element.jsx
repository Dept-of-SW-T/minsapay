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
  &:hover {
    & img {
      opacity: 0.8;
    }
    cursor: pointer;
  }
`;

const Img = styled.img`
  width: 80px;
  opacity: 0.4;
`;

export default function MenuAddElement({ onClick }) {
  return (
    <Wrapper onClick={onClick}>
      <Img src={AddMenuIcon} />
    </Wrapper>
  );
}
