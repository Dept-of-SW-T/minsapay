import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  BORDER_GRAY,
  MINSAPAY_BLUE,
  BUTTON_SHADOW,
} from "../../components/theme-definition";
import { moderatorFirebase } from "../../features/moderator-firebase-interaction";
import { onSnapshot } from "firebase/firestore";
import { MINSAPAY_FONT } from "../../components/theme-definition";

const Wrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Text = styled.span`
  font-family: "TheJamsil";
  font-size: 1.2em;
  /* width: 23.5%; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: white;
`;

const Btn = styled.button`
  border-radius: 40px;
  border: 3px solid ${BORDER_GRAY};
  background-color: ${MINSAPAY_BLUE};
  box-shadow: 0px 4px 4px 0px ${BUTTON_SHADOW};
  color: white;
  text-align: center;
  /* width: %; */
  /* height: 45%; */
  @media only screen and (max-width: 768px) {
    height: 100%;
  }
  font-size: 1.7em;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 30px auto;
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-auto-rows: max-content;
  /* grid-template-rows: auto 1fr; */
  gap: 2vw 1vw;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  align-items: start;
`;

const Input = styled.input.attrs({
  type: "number",
})`
  padding: 10px;
  border: none;
  width: 100%;
  font-size: 3vh;
  @media only screen and (max-width: 700px) {
    font-size: 2vh;
  }
  outline: none;
  border-bottom: 3px solid ${BORDER_GRAY};
  margin-top: 20px;
  font-family: ${MINSAPAY_FONT};

  &:focus {
    border-bottom: 3px solid #444;
  }
`;

export function UserInfo({ userId, hideInfoPanel }) {
  const [balanceChangeVal, setBalanceChangeVal] = useState(0);
  const [selectedUser, setSelectedUser] = useState(
    moderatorFirebase.usersList[moderatorFirebase.usersIndex[userId]],
  );

  // useEffect(() => {
  //   setSelectedUser();
  //   console.log(selectedUser.data());
  // }, [userId, selectedUser]);

  useEffect(() => {
    setSelectedUser(
      moderatorFirebase.usersList[moderatorFirebase.usersIndex[userId]],
    );
  }, [userId]);

  onSnapshot(moderatorFirebase.usersRef[userId], () => {
    setSelectedUser(
      moderatorFirebase.usersList[moderatorFirebase.usersIndex[userId]],
    );
  });

  const onChange = (event) => {
    setBalanceChangeVal(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    moderatorFirebase.changeBalance(userId, balanceChangeVal);
    setBalanceChangeVal(0);
    hideInfoPanel();
  };

  const onClick = () => {
    moderatorFirebase.changeBalance(userId, balanceChangeVal);
    setBalanceChangeVal(0);
    hideInfoPanel();
  };

  const buttonValues = [10000, 5000, 1000, 500];
  return (
    <Wrapper>
      <Text>사용자: {selectedUser.data().username}</Text>
      <Text>보유 금액: {selectedUser.data().balance}</Text>
      <form onSubmit={onSubmit}>
        <Input
          type="number"
          onChange={onChange}
          value={balanceChangeVal}
          placeholder="변경할 금액 입력"
        ></Input>
      </form>
      <ButtonWrapper>
        {buttonValues.map((value) => {
          return (
            <Btn
              key={"+" + value}
              onClick={() => {
                setBalanceChangeVal((balance) => parseInt(balance) + value);
              }}
            >
              +{value}
            </Btn>
          );
        })}
      </ButtonWrapper>
      <ButtonWrapper>
        {buttonValues.map((value) => {
          return (
            <Btn
              key={"-" + value}
              onClick={() => {
                setBalanceChangeVal((balance) => parseInt(balance) - value);
              }}
            >
              -{value}
            </Btn>
          );
        })}
      </ButtonWrapper>
      <Btn onClick={() => setBalanceChangeVal(0)}>Clear</Btn>
      <Btn onClick={onClick}>반영하기</Btn>
    </Wrapper>
  );
}
