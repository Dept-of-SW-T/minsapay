import styled from "styled-components";
import { auth } from "../../features/login-feature";
import { useEffect, useState } from "react";
import CoupleList from "../../components/CPU/couple-list";
import { CPUHeader } from "../../components/CPU/cpu-header";
import { useNavigate } from "react-router-dom";
import ChangeKioskImage from "../../images/ChangeKioskImage.svg";
import {
  BACKGROUND_GRAY,
  BORDER_GRAY,
  BUTTON_SHADOW,
  MINSAPAY_BLUE,
} from "../../components/theme-definition";
import { CPUFirebase } from "../../features/CPU-firebase-interaction";
import OrderElementCPU from "../../components/CPU/order-element-CPU";
import { onSnapshot } from "firebase/firestore";

// border 다 추가하기

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CPUHomeBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* margin-bottom: 20px; */
`;
const TopDiv = styled.div`
  width: 95%;
  height: 20vh;
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    height: 25vh;
  }
  justify-content: space-evenly;
  font-family: "BMDOHYEON";
  gap: 4%;
  margin: 4vh auto 5vh;
  @media only screen and (max-width: 2000px) {
    font-size: calc(0.05vw + 1.1em);
  }
  // font size change needed
`;
const Title = styled.div`
  /* width: 969px; */
  flex: 2 1 0;
  height: 100%;
  border: 3px solid ${BORDER_GRAY};
  border-radius: 20px;
  background-size: cover;
  background-position: center;
`;
const OpacityLayer = styled.div`
  // 글씨가 세로로 정중앙이 아님 고침이 필요
  width: 100%;
  height: 100%;
  border-radius: 17px;
  font-family: "BMDOHYEON";
  font-size: 2.5em;
  color: white;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgb(0, 0, 0, 0.3);
`;
const TeamName = styled.div`
  /* margin-left: 125px; */
  text-align: center;
  /* width: 240px; */
  flex: 2 1 0;
`;
const Balance = styled.div`
  // needs font change
  /* margin-left: 190px; */
  text-align: center;
  /* width: 280px; */
  z-index: 100;
  flex: 2 1 0;
`;
const Label = styled.label`
  /* height: 40px; */
  flex: 1 1 0;
  display: flex;
  justify-content: center;
`;
const Image = styled.img`
  background-color: ${BACKGROUND_GRAY}; // 색 바꿀 것
  border-radius: 10px;
  /* width: 40px; */
  width: 1.1em;
  /* margin-left: 15px; */
  aspect-ratio: 1;
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
  @media only screen and (max-width: 768px) {
    flex-direction: row;
  }
  /* width: 384px; */
  flex: 1 1 0;
  height: 100%;
  justify-content: space-between;
  align-items: flex-end;
`;
const Btn = styled.button`
  border-radius: 40px;
  border: 3px solid ${BORDER_GRAY};
  background-color: ${MINSAPAY_BLUE};
  box-shadow: 0px 4px 4px 0px ${BUTTON_SHADOW};
  color: white;
  text-align: center;
  width: 100%;
  height: 45%;
  @media only screen and (max-width: 768px) {
    height: 100%;
  }
  font-size: 1.7em;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
const BodyDiv = styled.div`
  /* margin-top: 5vh; */
  width: 100%;
  height: 59vh;
  @media only screen and (max-width: 768px) {
    height: 56vh;
  }
`;

// add isloading to total page and image upload
export default function CPUHome() {
  const [balance, setBalance] = useState(0);
  const [kioskImage, setKioskImage] = useState("");
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    let unsubscribe = null;
    const init = async () => {
      // 초기에 잔고, 이미지 로딩
      await CPUFirebase.init();
      await CPUFirebase.kioskImageInit();
      setBalance(CPUFirebase.userDocData.balance);
      setKioskImage(CPUFirebase.kioskImageDownloadUrl);
      setOrderList(
        CPUFirebase.orderHistory
          .toReversed()
          .map((val, index) => (
            <OrderElementCPU
              menuName={val.menu_name}
              userName={val.buyer_name}
              time={val.reception_time}
              status={val.current_state}
              key={index}
            />
          )),
      );
      unsubscribe = onSnapshot(CPUFirebase.userDocRef, (doc) => {
        // 나중에 features로 이관할 방법을 찾을 것임
        CPUFirebase.userDoc = doc;
        CPUFirebase.userDocData = doc.data();
        CPUFirebase.orderHistory = JSON.parse(
          CPUFirebase.userDocData.order_history,
        );
        setBalance(CPUFirebase.userDocData.balance);
        setKioskImage(CPUFirebase.kioskImageDownloadUrl);
        setOrderList(
          CPUFirebase.orderHistory
            .toReversed()
            .map((val, index) => (
              <OrderElementCPU
                menuName={val.menu_name}
                userName={val.buyer_name}
                time={val.reception_time}
                status={val.current_state}
                key={index}
              />
            )),
        );
      });
    };
    init();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  const navigate = useNavigate();
  const onChangeMenuClick = () => {
    navigate("change-menu");
  };
  const onRefundApprovalClick = () => {
    navigate("refund-approval");
  };
  const onFileChange = async (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    await CPUFirebase.changeKioskImage(file);
    setKioskImage(CPUFirebase.kioskImageDownloadUrl); // 이미지 업로드 시 사진 바꾸기
  };
  return (
    <Wrapper>
      <CPUHeader />
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
          <CoupleList dataList={orderList} />
        </BodyDiv>
      </CPUHomeBox>
    </Wrapper>
  );
}
