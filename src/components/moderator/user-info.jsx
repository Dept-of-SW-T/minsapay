import styled from "styled-components";

const Wrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Text = styled.span`
  font-family: "BMDOHYEON";
  font-size: 1.2em;
  /* width: 23.5%; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
`;

export function UserInfo({ selectedUser }) {
  return (
    <Wrapper>
      <Text>사용자: {selectedUser.username}</Text>
      <Text>보유 금액: {selectedUser.balance}</Text>
      <form>
        <input type="text"></input>
      </form>
    </Wrapper>
  );
}
