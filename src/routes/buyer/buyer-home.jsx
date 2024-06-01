import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buyerFirebase } from "../../features/buyer-firebase-interaction";
import OrderElementBuyer from "../../components/buyer/order-element-buyer";
import { onSnapshot } from "firebase/firestore";
import CoupleList from "../../components/CPU/couple-list";
import { BuyerHeader } from "../../components/buyer/buyer-header";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default function BuyerHome() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    let unsubscribe = null;
    const init = async () => {
      // 초기에 잔고, 이미지 로딩
      await buyerFirebase.init();
      setBalance(buyerFirebase.userDocData.balance);
      setOrderList(
        buyerFirebase.orderHistory
          .toReversed()
          .map((val, index) => (
            <OrderElementBuyer
              menuName={val.menu_name}
              userName={val.team_name}
              price={val.price}
              status={val.current_state}
              id={val.menu_id}
              key={index}
            />
          )),
      );
      unsubscribe = onSnapshot(buyerFirebase.userDocRef, (doc) => {
        // 나중에 features로 이관할 방법을 찾을 것임
        buyerFirebase.userDoc = doc;
        buyerFirebase.userDocData = doc.data();
        setBalance(buyerFirebase.userDocData.balance);
        setOrderList(
          buyerFirebase.orderHistory
            .toReversed()
            .map((val, index) => (
              <OrderElementBuyer
                menuName={val.menu_name}
                userName={val.team_name}
                price={val.price}
                status={val.current_state}
                id={val.menu_id}
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
  return (
    <Wrapper>
      <BuyerHeader balance={balance} />
      <CoupleList dataList={orderList} />
      <button onClick={() => navigate("./buyer-payment")}>
        To Buyer Payment
      </button>
    </Wrapper>
  );
}
