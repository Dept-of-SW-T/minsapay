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
import { useNavigate } from "react-router-dom";

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
  height: 165px;
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
const Total = styled.div`
  margin-top: 20px;

  height: calc(59px - 6px);
  width: calc(100% - 6px - 30px);
  padding-left: 15px;
  padding-right: 15px;
  border: 3px solid #4478ff;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  font-family: "BMDOHYEON";
`;
const Pay = styled.div`
  margin-top: 20px;

  width: 100%;
  height: 75px;
  border-radius: 20px;
  background-color: #4478ff;
  color: white;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  font-size: 36px;
  font-family: "BMDOHYEON";

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export default function KioskHome() {
  const [kioskImage, setKioskImage] = useState("");
  const [menuList, setMenuList] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const onAddToOrderClick = (e) => {
    const id = parseInt(e.target.id.substring(0, e.target.id.length - 4));
    console.log(orders);
    for (let i = 0; i < orders.length; i++) {
      if (id === orders[i].id) {
        return;
      }
    }
    for (let i = 0; i < CPUFirebase.menuList.length; i++) {
      if (id === CPUFirebase.menuList[i].id) {
        orders.push({
          id: id,
          imageDownloadUrl: CPUFirebase.menuList[i].imageDownloadUrl,
          quantity: 1,
          price: CPUFirebase.menuList[i].price,
          menuName: CPUFirebase.menuList[i].menuName,
        });
        setOrders(orders);
        break;
      }
    }
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
  const onAddQuantityButtonClick = (e) => {
    const id = parseInt(e.target.id.substring(0, e.target.id.length - 3));
    console.log(id);
    for (let i = 0; i < orders.length; i++) {
      if (id === orders[i].id) {
        orders[i].quantity++;
        break;
      }
    }
  };
  const onLowerQuantityButtonClick = (e) => {
    const id = parseInt(e.target.id.substring(0, e.target.id.length - 3));
    for (let i = 0; i < orders.length; i++) {
      if (id === orders[i].id) {
        orders[i].quantity--;
        setOrders(orders);
        break;
      }
    }
  };
  const onOrderElementKioskDelete = (e) => {
    const id = parseInt(e.target.id.substring(0, e.target.id.length - 3));
    for (let i = 0; i < orders.length; i++) {
      if (id === orders[i].id) {
        orders.splice(i, 1);
        setOrders(orders);
        break;
      }
    }
  };
  function getTotal() {
    let sum = 0;
    orders.forEach((val) => (sum += val.price * val.quantity));
    return sum;
  }
  const onPayClick = () => {
    if (orders.length === 0) return;
    // some firebase stuff
    navigate("./kiosk-thankyou"); // 이전 탭으로 돌아가지 못하게 해야 함?
  };
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
            orders={orders.map((value) => (
              <OrderElementKiosk
                imageDownloadUrl={value.imageDownloadUrl}
                menuName={value.menuName}
                price={value.price}
                quantity={value.quantity}
                key={value.id}
                id={value.id}
                onAddQuantityButtonClick={onAddQuantityButtonClick}
                onLowerQuantityButtonClick={onLowerQuantityButtonClick}
                onOrderElementKioskDelete={onOrderElementKioskDelete}
              />
            ))}
          />
          <Total>
            <p>Total</p>
            <p>{getTotal()}원</p>
          </Total>
          <Pay onClick={onPayClick}>Pay!</Pay>
        </div>
      </PaymentBox>
    </Wrapper>
  );
}
// need to remove key later
