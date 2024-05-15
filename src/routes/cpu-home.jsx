import styled from "styled-components";
import { auth } from "../features/login-feature";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
`;

const CPUHomeBox = styled.div`
  width: 90%;
`;

const TopDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BodyDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Text = styled.div`
  width: 50%;
`;

const OrderElement = styled.div`
  width: 50%;
`;

export default function CPUHome() {
  const [balance, setBalance] = useState(0);

  return (
    <Wrapper>
      <CPUHomeBox>
        <TopDiv>
          <Title>
            <Text>{auth.currentUser.username}</Text>
            <Text>{balance}</Text>
          </Title>
        </TopDiv>
        <BodyDiv>
          <OrderElement />
        </BodyDiv>
      </CPUHomeBox>
    </Wrapper>
  );
}

/* 
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