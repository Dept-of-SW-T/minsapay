import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  border-radius: 20px;
  justify-content: space-around;
  width: 50%;
  background-color: red;
  padding-left: 0.5%;
  padding-right: 0.5%;
`;

const Text = styled.div`
  text-align: center;
  font-size: x-large;
  flex: auto;
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
