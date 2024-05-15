import styled from "styled-components";
import { auth } from "../features/login-feature";
import { useState } from "react";
import Logo from "../images/TempLogoMinsapay.svg";
import OrderList from "../components/order-list";
import { Header } from "../components/cpu-header";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../firebase";

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
  // font size change needed
`;
const Title = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
`;
const Text = styled.div`
  width: 221px;
`;
const BodyDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export default function CPUHome() {
  const userDocRef = doc(database, "Teams", auth.currentUser.userID);
  const [balance, setBalance] = useState(0);
  const init = async () => {
    const userDoc = await getDoc(userDocRef);
    const userDocData = userDoc.data();
    setBalance(userDocData.balance);
  };
  init();
  return (
    <Wrapper>
      <Header>
        <Image src={Logo} />
      </Header>
      <CPUHomeBox>
        <TopDiv>
          <Title>
            <Text>{auth.currentUser.username}</Text>
            <Text>{balance}원</Text>
          </Title>
        </TopDiv>
        <BodyDiv>
          <OrderList />
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
