import styled from "styled-components";
import {
  BORDER_GRAY,
  BUTTON_SHADOW,
  MINSAPAY_TITLE,
} from "../../components/theme-definition";
import { CPUFirebase } from "../../features/CPU-firebase-interaction";
import { useEffect, useState } from "react";
import QuadList from "../../components/kiosk/quad-list";
import MenuDisplayElement from "../../components/kiosk/menu-display-element";
import ShoppingCart from "../../images/ShoppingCart.svg";
import OrderList from "../../components/kiosk/order-list";
import OrderElementKiosk from "../../components/kiosk/order-element-kiosk";
import { useNavigate } from "react-router-dom";
import { kioskFirebase } from "../../features/kiosk-firebase-interaction";
import LogOutIcon from "../../images/LogOut.svg";
import Loading from "../../components/loading";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;
const DisplayBox = styled.div`
  height: 100vh;
  width: 75%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DisplayBoxContents = styled.div`
  height: 100%;
  width: 67.7vw;
`;
const Header = styled.div`
  width: 100%;
  height: 0.5vh;
  display: flex;
  align-items: center;
  font-family: ${MINSAPAY_TITLE};
  margin-top: 5vh;
  margin-bottom: 5vh;
  font-size: 1.4vw;
  justify-content: space-between;
`;
const LogoutBtn = styled.img`
  height: 5vh;
  &:hover {
    cursor: pointer;
  }
`;
const Title = styled.div`
  width: calc(100%);
  aspect-ratio: 7.76;
  //border: 3px solid ${BORDER_GRAY}; Really no border???
  border-radius: 1.5vw;
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
  font-family: ${MINSAPAY_TITLE};
  font-size: 4.2vw;
`;
const MenuTitle = styled.div`
  height: 9vh;
  display: flex;
  align-items: center;
  font-family: ${MINSAPAY_TITLE};
  font-size: 4.5vh;
`;
const PaymentBox = styled.div`
  height: 100vh;
  width: 25%;
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
  height: 23vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: ${MINSAPAY_TITLE};
  font-size: 2.5vw;
  gap: 10px;
`;
const ShoppingCartImage = styled.img`
  width: 3vw;
`;
const Total = styled.div`
  margin-top: 5vh;

  height: calc(13% - 5vh);
  width: calc(100% - 3vw);
  padding-left: 1.4vw;
  padding-right: 1.4vw;
  border: 3px solid #4478ff;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  font-family: ${MINSAPAY_TITLE};
`;
const Pay = styled.div`
  margin-top: 1.5vh;
  margin-bottom: 2vh;
  width: 100%;
  height: 8vh;
  border-radius: 1.5vw;
  background-color: #4478ff;
  color: white;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  font-size: 4vh;
  font-family: ${MINSAPAY_TITLE};

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export default function KioskHome() {
  // need to add all sorts of is loadings
  const [isLoading, setIsLoading] = useState(true);
  const [kioskImage, setKioskImage] = useState("");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      await CPUFirebase.init();
      await CPUFirebase.kioskImageInit();
      await kioskFirebase.init();
      setKioskImage(CPUFirebase.kioskImageDownloadUrl);
      setIsLoading(false);
      if (CPUFirebase.userDocData.linked_buyer === "")
        navigate("/kiosk-home/kiosk-cover");
    };
    init();
  }, []);

  const changeOrderQuantity = (id, quantity) => {
    for (let i = 0; i < orders.length; i++) {
      if (id === orders[i].id) {
        const tempOrders = [...orders];
        tempOrders[i].quantity += quantity;
        setOrders([...tempOrders]);
        break;
      }
    }
  };

  const onAddToOrderClick = (e) => {
    const id = parseInt(e.target.id.substring(0, e.target.id.length - 4));
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
        setOrders([...orders]);
        break;
      }
    }
  };

  const onAddQuantityButtonClick = (e) => {
    const id = parseInt(e.target.id.substring(0, e.target.id.length - 3));
    changeOrderQuantity(id, 1);
  };

  const onLowerQuantityButtonClick = (e) => {
    const id = parseInt(e.target.id.substring(0, e.target.id.length - 3));
    changeOrderQuantity(id, -1);
  };

  const onOrderElementKioskDelete = (e) => {
    const id = parseInt(e.target.id.substring(0, e.target.id.length - 3));
    for (let i = 0; i < orders.length; i++) {
      if (id === orders[i].id) {
        const updatedOrders = [...orders]; // Create a copy of orders
        updatedOrders.splice(i, 1); // Remove the order at index
        setOrders(updatedOrders); // Update state with the modified copy
        break;
      }
    }
  };

  function getTotal() {
    let sum = 0;
    orders.forEach((val) => (sum += val.price * val.quantity));
    return sum;
  }

  const onPayClick = async () => {
    if (orders.length === 0) {
      alert("물품을 최소 1개 선택해주세요.");
      return;
    }
    if (!confirm("결제하시겠습니까?")) return;

    setIsLoading(true);
    await kioskFirebase.submitOrders(orders, getTotal());
    await kioskFirebase.removeLinkedBuyer();
    setIsLoading(false);
    navigate("/kiosk-home/kiosk-thankyou"); // 이전 탭으로 돌아가지 못하게 해야 함?
  };

  const onLogoutBtnClick = async () => {
    if (!confirm("구매를 취소하시겠습니까?")) return;
    await kioskFirebase.removeLinkedBuyer();
    navigate("/kiosk-home/kiosk-cover");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <DisplayBox>
        <DisplayBoxContents>
          <Header>
            <div>
              Store/{isLoading ? "" : kioskFirebase.userDocData.username}
            </div>
            <LogoutBtn src={LogOutIcon} onClick={onLogoutBtnClick} />
          </Header>
          <Title style={{ backgroundImage: `url(${kioskImage})` }}>
            <OpacityLayer>
              <TeamName>
                {isLoading ? "" : kioskFirebase.userDocData.username}
              </TeamName>
            </OpacityLayer>
          </Title>
          <MenuTitle>메뉴</MenuTitle>
          <QuadList
            dataList={
              isLoading
                ? []
                : CPUFirebase.menuList.map((value) => {
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
                  })
            }
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
