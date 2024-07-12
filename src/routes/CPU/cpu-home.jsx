import styled from "styled-components";
import { useEffect, useState } from "react";
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
import { onSnapshot } from "firebase/firestore";
import Loading from "../../components/loading";
import MenuTable from "../../components/CPU/menu-table";
import { SearchElement } from "../../components/moderator/search-element";

// border 다 추가하기

const Wrapper = styled.div`
  width: 100vw;
  height: flex;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
`;
const CPUHomeBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  margin: 4vh auto 2vh;
  @media only screen and (max-width: 2000px) {
    font-size: calc(0.05vw + 1.1em);
  }
`;

const BodyDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  flex: 2 1 0;
  height: 100%;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
`;
const OpacityLayer = styled.div`
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
  text-align: center;
  flex: 2 1 0;
`;
const Balance = styled.div`
  text-align: center;
  z-index: 100;
  flex: 2 1 0;
`;
const Label = styled.label`
  flex: 1 1 0;
  display: flex;
  justify-content: center;
`;
const Image = styled.img`
  background-color: ${BACKGROUND_GRAY};
  border-radius: 10px;
  width: 1.1em;
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
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    flex-direction: row;
  }
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
const TableWrapper = styled.div`
  width: 100vw;
  height: flex;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export default function CPUHome() {
  const [balance, setBalance] = useState(0);
  const [kioskImage, setKioskImage] = useState("khgyhgjhfg");
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState(null);
  const [menuFilter, setMenuFilter] = useState(null);

  const applyFilter = function () {
    const tempList = [];
    console.log(CPUFirebase);
    for (let i = 0; i < CPUFirebase.orderHistory.length; i++) {
      if (
        menuFilter !== null &&
        !contains(CPUFirebase.orderHistory[i].menu_name, menuFilter.toString())
      )
        continue;
      if (
        nameFilter !== null &&
        !contains(CPUFirebase.orderHistory[i].buyer_name, nameFilter.toString())
      )
        continue;
      tempList.push(CPUFirebase.orderHistory[i]);
    }

    // setOrderList(
    //   tempList.toReversed().map((val, index) => (
    //     <tr key={index}>
    //       <Td>{index + 1}</Td>
    //       <Td>{val.menu_name}</Td>
    //       <Td>{val.buyer_name}</Td>
    //       <Td>{val.reception_time}</Td>
    //       <Td>{val.current_state}</Td>
    //       <Td>
    //         <RefundButton>Refund</RefundButton>
    //       </Td>
    //     </tr>
    //   )),
    // );
    setOrderList(
      tempList.toReversed().map((val, index) => ({
        id: index + 1,
        menu_name: val.menu_name,
        buyer_name: val.buyer_name,
        reception_time: val.reception_time,
        current_state: val.current_state,
        order_id: val.order_id,
        refund_request: val.refund_request,
      })),
    );
  };

  useEffect(() => {
    let unsubscribe = null;
    const init = async () => {
      await CPUFirebase.init();
      await CPUFirebase.kioskImageInit();
      setIsLoading(false);
      setBalance(CPUFirebase.userDocData.balance);
      setKioskImage(CPUFirebase.kioskImageDownloadUrl);
      setOrderList(
        CPUFirebase.orderHistory.toReversed().map((val, index) => ({
          id: index + 1,
          menu_name: val.menu_name,
          buyer_name: val.buyer_name,
          reception_time: val.reception_time,
          current_state: val.current_state,
          order_id: val.order_id,
          refund_request: val.refund_request,
        })),
      );
      unsubscribe = onSnapshot(CPUFirebase.userDocRef, (doc) => {
        CPUFirebase.userDoc = doc;
        CPUFirebase.userDocData = doc.data();
        CPUFirebase.orderHistory = JSON.parse(
          CPUFirebase.userDocData.order_history,
        );
        setBalance(CPUFirebase.userDocData.balance);
        setKioskImage(CPUFirebase.kioskImageDownloadUrl);
        // setOrderList(
        //   CPUFirebase.orderHistory.toReversed().map((val, index) => (
        //     <tr key={index}>
        //       <Td>{index + 1}</Td>
        //       <Td>{val.menu_name}</Td>
        //       <Td>{val.buyer_name}</Td>
        //       <Td>{val.reception_time}</Td>
        //       <Td>{val.current_state}</Td>
        //       <Td>
        //         <RefundButton>Refund</RefundButton>
        //       </Td>
        //     </tr>
        //   )),
        // );
        applyFilter();
        setIsLoading(false);
      });
    };
    init();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  useEffect(applyFilter, [nameFilter]);
  useEffect(applyFilter, [menuFilter]);

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
  const contains = (str1, str2) => {
    for (let i = 0; i < str1.length; i++) {
      if (i >= str2.length) return true;
      if (str1.charAt(i) != str2.charAt(i)) return false;
    }
    return true;
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
              <SearchElement
                searchFunc={setNameFilter}
                inputLabel="이름으로 필터링"
              />
              <SearchElement
                searchFunc={setMenuFilter}
                inputLabel="메뉴별로 필터링"
              />
              <TableWrapper>
                <MenuTable orderList={orderList} />
              </TableWrapper>
            </BodyDiv>
          </CPUHomeBox>
        </Wrapper>
      )}
    </>
  );
}
