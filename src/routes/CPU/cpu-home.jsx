import styled from "styled-components";
import { useEffect, useState } from "react";
// import CoupleList from "../../components/CPU/couple-list";
import { CPUHeader } from "../../components/CPU/cpu-header";
import { useNavigate } from "react-router-dom";
import ChangeKioskImage from "../../images/ChangeKioskImage.svg";
import {
  BACKGROUND_GRAY,
  BORDER_GRAY,
  MINSAPAY_BLUE,
  MINSAPAY_TITLE,
} from "../../components/theme-definition";
import { CPUFirebase } from "../../features/CPU-firebase-interaction";
// import OrderElementCPU from "../../components/CPU/order-element-CPU";
import { onSnapshot } from "firebase/firestore";
import Loading from "../../components/loading";
import MenuTable from "../../components/CPU/menu-table";

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
  //margin-bottom: 20px;
`;
const TopDiv = styled.div`
  width: 90%;
  height: 20vh;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    height: 25vh;
  }
  justify-content: space-evenly;
  font-family: ${MINSAPAY_TITLE};
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
  //border: 3px solid ${BORDER_GRAY};
  border-radius: 10px;
  background-size: cover;
  background-position: center;
`;
const OpacityLayer = styled.div`
  // 글씨가 세로로 정중앙이 아님 고침이 필요
  width: 100%;
  height: 100%;
  border-radius: 17px;
  font-family: ${MINSAPAY_TITLE};
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
  border-radius: 10px;
  border: 0px solid ${BORDER_GRAY};
  background-color: ${MINSAPAY_BLUE};

  color: white;
  text-align: center;
  width: 100%;
  height: 45%;
  @media only screen and (max-width: 768px) {
    height: 100%;
  }
  font-size: 1.3em;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  text-align: center; /* 텍스트 가운데 정렬 */
  vertical-align: middle; /* 세로 가운데 정렬 */
`;

const RefundButton = styled.button`
  padding: 5px 10px;
  font-size: 12px;
  color: white;
  background-color: #f44336;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
  text-align: center; /* 버튼 가운데 정렬 */

  &:hover {
    background-color: #e53935;
  }
`;

// add isloading to total page and image upload
export default function CPUHome() {
  const [balance, setBalance] = useState(0);
  const [kioskImage, setKioskImage] = useState("khgyhgjhfg");
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let unsubscribe = null;
    const init = async () => {
      // 초기에 잔고, 이미지 로딩
      await CPUFirebase.init();
      await CPUFirebase.kioskImageInit();
      setIsLoading(false);
      setBalance(CPUFirebase.userDocData.balance);
      setKioskImage(CPUFirebase.kioskImageDownloadUrl);
      setOrderList(
        CPUFirebase.orderHistory.toReversed().map((val, index) => (
          <tr key={index}>
            <Td>{val.menu_name}</Td>
            <Td>{val.buyer_name}</Td>
            <Td>{val.reception_time}</Td>
            <Td>{val.current_state}</Td>
            <Td>
              <RefundButton>Refund</RefundButton>
            </Td>
          </tr>
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
          CPUFirebase.orderHistory.toReversed().map((val, index) => (
            <tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{val.menu_name}</Td>
              <Td>{val.buyer_name}</Td>
              <Td>{val.reception_time}</Td>
              <Td>{val.current_state}</Td>
              <Td>
                <RefundButton>Refund</RefundButton>
              </Td>
            </tr>
          )),
        );
        setIsLoading(false);
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
  const onAddSellerClick = async () => {
    navigate("add-seller");
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
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <CPUHomeBox>
            <CPUHeader />
            <TopDiv>
              <Title style={{ backgroundImage: `url(${kioskImage})` }}>
                <OpacityLayer>
                  <TeamName>
                    {isLoading ? "" : CPUFirebase.userDocData.username}
                  </TeamName>
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
                <Btn onClick={onAddSellerClick}>부원추가</Btn>
              </HeaderBtns>
            </TopDiv>
            <BodyDiv>
              {/* <CoupleList dataList={orderList} /> */}
              <MenuTable orderList={orderList} />
            </BodyDiv>
          </CPUHomeBox>
        </Wrapper>
      )}
    </>
  );
}
