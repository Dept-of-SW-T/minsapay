import styled from "styled-components";
import { auth } from "../../features/login-feature";
import { BORDER_GRAY } from "../theme-definition";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  justify-content: space-between;
  font-family: "BMDOHYEON";
  padding: 3vh;
`;

const SecondaryTitle = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.div`
  width: 70vw;
  height: 15vh;
  border: 3px solid ${BORDER_GRAY};
  border-radius: 20px;
  background-size: cover;
  background-size: center;
`;

const MenuArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
`;

export default function Banner() {
  return (
    <Wrapper>
      <MenuArea>
        <SecondaryTitle>Store - {auth.currentUser.userID}</SecondaryTitle>
        <Title>{auth.currentUser.username}</Title>
      </MenuArea>
    </Wrapper>
  );
}
