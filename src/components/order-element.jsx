import styled from "styled-components";
import { BORDER_GRAY } from "./theme-definition";

const Wrapper = styled.span`
  // needs css fixing
  width: 654px;
  height: 84.89px;
  border: 3px solid ${BORDER_GRAY};
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  padding-left: 0.5%;
  padding-right: 0.5%;
  margin-top: 20px; // needs to delete
`;

const Text = styled.span`
  font-family: "BMDOHYEON";
  font-size: 24px;
  width: 157px;
  border-right: 3px solid ${BORDER_GRAY};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export default function OrderElement({ menuName, userName, time, status }) {
  return (
    <Wrapper>
      <Text>{menuName}</Text>
      <Text>{userName}</Text>
      <Text>{time}</Text>
      <Text>{status}</Text>
    </Wrapper>
  );
}
