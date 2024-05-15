import styled from "styled-components";
import { auth } from "../features/login-feature";
import { useState } from "react";
import Logo from "../images/TempLogoMinsapay.svg";
import CoupleList from "../components/couple-list";
import { Header } from "../components/cpu-header";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../firebase";
import { useNavigate } from "react-router-dom";

// border 다 추가하기

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 40px;
`;

const Image = styled.img`
  width: 50px;
  margin-left: 11px;
`;
const CPUHomeBox = styled.div`
  width: 1355px;
`;
const TopDiv = styled.div`
  margin-top: 21px;
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  // font size change needed
`;

const HeaderBtns = styled.div`
  // button 사이 gap 추가
  display: flex;
  flex-direction: column;
  width: 384px;
  height: 100%;
  justify-content: space-around;
  align-items: flex-end;
`;

const Btn = styled.button`
  border-radius: 20px;
  background-color: skyblue;
  text-align: center;
  width: 355px;
  font-size: large;
`;

const Title = styled.div`
  width: 971px;
  height: 100%;
  flex-direction: row;
  display: flex;
  align-items: center;
  border: 1px solid #d8dae5;
`;
const TeamName = styled.div`
  // needs font change
  margin-left: 125px;
  text-align: center;
  width: 240px;
`;
const Balance = styled.div`
  // needs font change
  margin-left: 233px;
  text-align: center;
  width: 222px;
`;
const BodyDiv = styled.div`
  display: flex;
  margin-top: 39px;
  width: 100%;
  flex-direction: column;
`;

export default function CPUHome() {
  const userDocRef = doc(database, "Teams", auth.currentUser.userID);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();
  const init = async () => {
    const userDoc = await getDoc(userDocRef);
    const userDocData = userDoc.data();
    setBalance(userDocData.balance);
  };
  init();
  const onChangeMenuClick = (e) => {
    e.preventDefault();
    navigate("change-menu");
  };
  const onRefundApprovalClick = (e) => {
    e.preventDefault();
    navigate("refund-approval");
  };
  return (
    <Wrapper>
      <Header>
        <Image src={Logo} />
      </Header>
      <CPUHomeBox>
        <TopDiv>
          <Title>
            <TeamName>{auth.currentUser.username}</TeamName>
            <Balance>{balance}원</Balance>
          </Title>
          <HeaderBtns>
            <Btn onClick={onChangeMenuClick}>메뉴편집</Btn>
            <Btn onClick={onRefundApprovalClick}>환불승인</Btn>
          </HeaderBtns>
        </TopDiv>
        <BodyDiv>
          <CoupleList />
        </BodyDiv>
      </CPUHomeBox>
    </Wrapper>
  );
}

/* using database!!
const doc = await addDoc(collection(db, "tweets"), {
  tweet,
  createdAt: Date.now(),
  username: user.displayName || "Anonymous",
  userId: user.uid,
});
await updateDoc(doc, {
  photo: url,
});
const fetchTweets = async () => {
    const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(tweetsQuery);
    const tweets = snapshot.docs.map((doc) => {
        const {tweet, createdAt, userId, username, photo} = doc.data();
        return {
            tweet, createdAt, userId, username, photo,
            id: doc.id,
        }
    }); */
