import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sellerFirebase } from "../../features/seller-firebase-interaction";
import OrderElementSeller from "../../components/seller/order-element-seller";
import CoupleList from "../../components/CPU/couple-list";
import { SellerHeader } from "../../components/seller/seller-header";
import { onSnapshot } from "firebase/firestore";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default function SellerHome() {
  const [orderList, setOrderList] = useState([]);
  const currentTeam = useParams().id;
  useEffect(() => {
    let unsubscribe = null;
    const init = async () => {
      await sellerFirebase.init();
      await sellerFirebase.getTeamData(currentTeam);
      setOrderList(
        sellerFirebase.orderHistory
          .toReversed()
          .map((val, index) => (
            <OrderElementSeller
              menuName={val.menu_name}
              status={val.current_state}
              id={val.order_id}
              processor={val.order_processor}
              buyer={val.buyer_name}
              receptionTime={val.reception_time}
              key={index}
            />
          )),
      );
    };
    init();
    unsubscribe = onSnapshot(sellerFirebase.teamDocRef, (doc) => {
      sellerFirebase.teamDoc = doc;
      sellerFirebase.teamDocData = doc.data();
      sellerFirebase.orderHistory = JSON.parse(
        sellerFirebase.teamDocData.order_history,
      );
      setOrderList(
        sellerFirebase.orderHistory
          .toReversed()
          .map((val, index) => (
            <OrderElementSeller
              menuName={val.menu_name}
              status={val.current_state}
              id={val.order_id}
              processor={val.order_processor}
              buyer={val.buyer_name}
              receptionTime={val.reception_time}
              key={index}
            />
          )),
      );
    });
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <Wrapper>
      <SellerHeader />
      <CoupleList dataList={orderList} />
    </Wrapper>
  );
}
