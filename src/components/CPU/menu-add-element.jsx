import styled from "styled-components";
import { BORDER_GRAY } from "../theme-definition";
import AddMenuIcon from "../../images/AddMenu.svg";

const Wrapper = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 96%;
  height: 18vw;
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
  height: 40%;
  opacity: 0.4;
`;

export default function MenuAddElement({ onClick }) {
  // + 싸인만 있는 element, 누르는 경우 인자로 받은 onClick를 실행한다.
  return (
    <Wrapper onClick={onClick}>
      <Img src={AddMenuIcon} />
    </Wrapper>
  );
}
