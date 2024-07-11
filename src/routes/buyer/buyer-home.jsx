import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buyerFirebase } from "../../features/buyer-firebase-interaction";
import OrderElementBuyer from "../../components/buyer/order-element-buyer";
import { onSnapshot } from "firebase/firestore";
import CoupleList from "../../components/CPU/couple-list";
import { BuyerHeader } from "../../components/buyer/buyer-header";
import PayIconRef from "../../images/go-to-buyer-payment.svg";
import Loading from "../../components/loading";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PayIconWrapper = styled.div`
  width: 100%;
  height: 9vh;
  display: flex;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PayIcon = styled.img`
  height: 7vh;
  margin-bottom: 1vh;
  margin-top: 1vh;
  &:hover {
    cursor: pointer;
  }
`;
export default function BuyerHome() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
              teamName={val.team_name}
              price={val.price}
              status={val.current_state}
              refundRequest={val.refund_request}
              id={val.order_id}
              key={index}
            />
          )),
      );
      unsubscribe = onSnapshot(buyerFirebase.userDocRef, (doc) => {
        buyerFirebase.userDoc = doc;
        buyerFirebase.userDocData = doc.data();
        buyerFirebase.orderHistory = JSON.parse(
          buyerFirebase.userDocData.order_history,
        );
        setBalance(buyerFirebase.userDocData.balance);
        setOrderList(
          buyerFirebase.orderHistory
            .toReversed()
            .map((val, index) => (
              <OrderElementBuyer
                menuName={val.menu_name}
                teamName={val.team_name}
                price={val.price}
                status={val.current_state}
                refundRequest={val.refund_request}
                id={val.order_id}
                key={index}
              />
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
  return (
    <Wrapper>
      <BuyerHeader balance={balance} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <CoupleList dataList={orderList} />
          <PayIconWrapper>
            <PayIcon
              onClick={() => navigate("./buyer-payment")}
              src={PayIconRef}
            />
          </PayIconWrapper>
        </>
      )}
    </Wrapper>
  );
}
