import styled from "styled-components";
import { auth } from "../features/login-feature";
import { useState } from "react";
import CoupleList from "../components/CPU/couple-list";
import { Header } from "../components/CPU/cpu-header";
import { useNavigate } from "react-router-dom";
import ChangeKioskImage from "../images/ChangeKioskImage.svg";
import {
  BACKGROUND_GRAY,
  BORDER_GRAY,
  BUTTON_SHADOW,
  MINSAPAY_BLUE,
} from "../components/theme-definition";
import { CPUFirebase } from "../features/CPU-firebase-interaction";

// border 다 추가하기

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 40px;
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
  font-family: "BMDOHYEON";
  font-size: 36px;
  // font size change needed
`;
const Title = styled.div`
  width: 969px;
  height: 134px;
  border: 3px solid ${BORDER_GRAY};
  border-radius: 20px;
  background-size: cover;
  background-size: center;
`;
const OpacityLayer = styled.div`
  // 글씨가 세로로 정중앙이 아님 고침이 필요
  width: 100%;
  height: 100%;
  border-radius: 17px;
  font-family: "BMDOHYEON";
  font-size: 48px;
  color: white;
  flex-direction: row;
  display: flex;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.3);
`;
const TeamName = styled.div`
  // needs font change
  margin-left: 125px;
  text-align: center;
  width: 240px;
  z-index: 100;
`;
const Balance = styled.div`
  // needs font change
  margin-left: 190px;
  text-align: center;
  width: 280px;
  z-index: 100;
`;
const Label = styled.label`
  height: 40px;
`;
const Image = styled.img`
  background-color: ${BACKGROUND_GRAY}; // 색 바꿀 것
  border-radius: 10px;
  width: 40px;
  margin-left: 15px;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;
const ImageUpload = styled.input`
  display: none;
`;
const HeaderBtns = styled.div`
  // button 사이 gap 추가
  display: flex;
  flex-direction: column;
  width: 384px;
  height: 100%;
  justify-content: space-around;
  align-items: flex-end;
  gap: 14px;
`;
const Btn = styled.button`
  border-radius: 40px;
  border: 3px solid ${BORDER_GRAY};
  background-color: ${MINSAPAY_BLUE};
  box-shadow: 0px 4px 4px 0px ${BUTTON_SHADOW};
  color: white;
  text-align: center;
  width: 349px;
  height: 62px;
  font-size: 20px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
const BodyDiv = styled.div`
  margin-top: 39px;
  width: 100%;
`;

export default function CPUHome() {
  const [balance, setBalance] = useState(0);
  const [kioskImage, setKioskImage] = useState("");
  CPUFirebase.init().then(() => {
    setBalance(CPUFirebase.userDocData.balance);
    setKioskImage(CPUFirebase.kiosk_image_download_url);
  });
  const navigate = useNavigate();
  const onChangeMenuClick = (e) => {
    navigate("change-menu");
  };
  const onRefundApprovalClick = (e) => {
    navigate("refund-approval");
  };
  const onFileChange = async (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    await CPUFirebase.changeKioskImage(file);
    setKioskImage(CPUFirebase.kiosk_image_download_url);
  };
  return (
    <Wrapper>
      <Header />
      <CPUHomeBox>
        <TopDiv>
          <Title style={{ backgroundImage: `url(${kioskImage})` }}>
            <OpacityLayer>
              <TeamName>{auth.currentUser.username}</TeamName>
              <Balance>{balance}원</Balance>
              <Label htmlFor="image-upload">
                <Image src={ChangeKioskImage} />
              </Label>
              <ImageUpload
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={onFileChange}
              />
            </OpacityLayer>
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
/*     const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
    const result = await uploadBytes(locationRef, file);
    const url = await getDownloadURL(result.ref);
    await updateDoc(doc, {
      photo: url,
    });
 */
