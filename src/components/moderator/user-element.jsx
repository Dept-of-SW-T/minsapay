import styled from "styled-components";
import { BORDER_GRAY } from "../theme-definition";

const Wrapper = styled.span`
  width: 80%;
  height: 5vw;
  border: 2px solid ${BORDER_GRAY};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  margin-top: 0.3rem; // 아래쪽에 간격 추가
  &:hover {
    cursor: pointer;
  }
`;

const TextLeft = styled.span`
  font-family: "BMDOHYEON";
  font-size: 1.2em;
  flex: 1; // flex 속성을 사용하여 균등 분배
  border-right: 3px solid ${BORDER_GRAY};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const TextRight = styled.span`
  font-family: "BMDOHYEON";
  font-size: 1.2em;
  flex: 1; // flex 속성을 사용하여 균등 분배
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export function UserElement({ userName, balance, onUserSelect, id }) {
  return (
    <Wrapper
      onClick={() => {
        console.log(id);
        onUserSelect(id);
      }}
    >
      <TextLeft>{userName}</TextLeft>
      <TextRight>{balance}</TextRight>
    </Wrapper>
  );
}
