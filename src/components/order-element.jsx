import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  border-radius: 20px;
  justify-content: space-around;
`;

const Text = styled.div`
  text-align: center;
  font-size: x-large;
  margin-left: 3px;
  margin-right: 3px;
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
