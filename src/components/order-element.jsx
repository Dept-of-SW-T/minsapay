import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

export default function OrderElement({ menuName, userName, time, status }) {
  return (
    <Wrapper>
      <div>{menuName}</div>
      <div>{userName}</div>
      <div>{time}</div>
      <div>{status}</div>
    </Wrapper>
  );
}
