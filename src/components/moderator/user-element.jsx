import styled from "styled-components";
import { BORDER_GRAY } from "../theme-definition";

const Wrapper = styled.span`
  width: 96%;
  height: 7vw;
  border: 3px solid ${BORDER_GRAY};
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  padding-left: 0px;
  padding-right: 0.5%;
  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.span`
  font-family: "BMDOHYEON";
  font-size: 1.2em;
  width: 23.5%;
  border-right: 3px solid ${BORDER_GRAY};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
  &#first-child {
    border-top-left-radius: 17px;
    border-bottom-left-radius: 17px;
  }
`;

export function UserElement({ userName, balance, onUserSelect, id }) {
  return (
    <Wrapper
      onClick={() => {
        onUserSelect(id);
      }}
    >
      <Text>{userName}</Text>
      <Text>{balance}</Text>
    </Wrapper>
  );
}
