import styled from "styled-components";
import { BORDER_GRAY, BUTTON_SHADOW } from "../components/theme-definition";
import { auth } from "../features/login-feature";
import { CPUFirebase } from "../features/CPU-firebase-interaction";
import { useEffect, useState } from "react";
import QuadList from "../components/kiosk/quad-list";
import MenuDisplayElement from "../components/kiosk/menu-display-element";
import ShoppingCart from "../images/ShoppingCart.svg";
import OrderList from "../components/kiosk/order-list";
import OrderElementKiosk from "../components/kiosk/order-element-kiosk";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;
const DisplayBox = styled.div`
  height: 100vh;
  width: calc(100% - 370px);
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DisplayBoxContents = styled.div`
  height: 100%;
  width: calc(100% - 112px);
`;
const Header = styled.div`
  width: 100%;
  height: 118px;
  display: flex;
  align-items: center;
  font-family: "BMDOHYEON";
  font-size: 24px;
`;
const Title = styled.div`
  width: calc(100%);
  height: 134px;
  //border: 3px solid ${BORDER_GRAY}; Really no border???
  border-radius: 20px;
  background-size: cover;
  background-position: center;
`;
const OpacityLayer = styled.div`
  // 글씨가 세로로 정중앙이 아님 고침이 필요
  width: 100%;
  height: 100%;
  border-radius: 17px;

  color: white;
  flex-direction: row;
  display: flex;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.3);
`;
const TeamName = styled.div`
  //margin-left: 45px;
  width: 100%;
  text-align: center;
  font-family: "BMDOHYEON";
  font-size: 64px;
`;
const MenuTitle = styled.div`
  height: 96px;
  display: flex;
  align-items: center;
  font-family: "BMDOHYEON";
  font-size: 36px;
`;
const PaymentBox = styled.div`
  height: 100vh;
  width: 370px;
  background-color: white;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  box-shadow: -3px 0px 6px 1px ${BUTTON_SHADOW};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ShoppingCartDiv = styled.div`
  width: 100%;
  height: 195px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "BMDOHYEON";
  font-size: 40px;
  gap: 10px;
`;
const ShoppingCartImage = styled.img`
  width: 50px;
`;
export default function KioskHome() {
  const [kioskImage, setKioskImage] = useState("");
  const [menuList, setMenuList] = useState([]);
  // const [orders, setOrders] = useState([]);
  const onAddToOrderClick = (e) => {
    const id = parseInt(e.target.id.substring(0, e.target.id.length - 4));
    console.log(id);
  };
  useEffect(() => {
    const init = async () => {
      await CPUFirebase.init();
      await CPUFirebase.kioskImageInit();
      setKioskImage(CPUFirebase.kioskImageDownloadUrl);
      setMenuList(
        CPUFirebase.menuList.map((value) => {
          return (
            <MenuDisplayElement
              key={value.id} // Add key prop
              menuImageUrl={value.imageDownloadUrl}
              menuName={value.menuName}
              price={value.price}
              id={value.id}
              onAddToOrderClick={onAddToOrderClick}
            />
          );
        }),
      );
    };
    init();
  }, []);
  return (
    <Wrapper>
      <DisplayBox>
        <DisplayBoxContents>
          <Header>Store/{auth.currentUser.username}</Header>
          <Title style={{ backgroundImage: `url(${kioskImage})` }}>
            <OpacityLayer>
              <TeamName>{auth.currentUser.username}</TeamName>
            </OpacityLayer>
          </Title>
          <MenuTitle>메뉴</MenuTitle>
          <QuadList
            dataList={menuList}
            redundancyElement={<MenuDisplayElement show={false} />}
          />
        </DisplayBoxContents>
      </DisplayBox>
      <PaymentBox>
        <div
          style={{
            height: "100%",
            width: "calc(100% - 54px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ShoppingCartDiv>
            <ShoppingCartImage src={ShoppingCart} />
            <p>내 카트</p>
          </ShoppingCartDiv>
          <OrderList
            orders={[
              <OrderElementKiosk
                menuImageUrl={""}
                menuName={"수제 햄버거"}
                price={4000}
                key={"1"}
              />,
            ]}
          />
        </div>
      </PaymentBox>
    </Wrapper>
  );
}
// need to remove key later
