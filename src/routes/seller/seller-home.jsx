import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sellerFirebase } from "../../features/seller-firebase-interaction";
import OrderElementSeller from "../../components/seller/order-element-seller";
import CoupleList from "../../components/CPU/couple-list";
import { SellerHeader } from "../../components/seller/seller-header";
import { onSnapshot } from "firebase/firestore";
import { MINSAPAY_FONT } from "../../components/theme-definition";
import Loading from "../../components/loading";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${MINSAPAY_FONT};
`;
export default function SellerHome() {
  const [orderList, setOrderList] = useState([]);
  const currentTeam = useParams().id;
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    let unsubscribe = null;
    const init = async () => {
      await sellerFirebase.init();
      if (!sellerFirebase.userDocData.team_list.includes(currentTeam)) {
        navigate("../seller-home/seller-select");
      }
      await sellerFirebase.getTeamData(currentTeam);
      setOrderList(
        sellerFirebase.orderHistory
          .filter((order) => order.refund_request === 0)
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
      unsubscribe = onSnapshot(sellerFirebase.teamDocRef, (doc) => {
        sellerFirebase.teamDoc = doc;
        sellerFirebase.teamDocData = doc.data();
        sellerFirebase.orderHistory = JSON.parse(
          sellerFirebase.teamDocData.order_history,
        );
        setOrderList(
          sellerFirebase.orderHistory
            .filter(
              (order) =>
                order.refund_request === 0 &&
                order.current_state !== "수령완료",
            )
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
      setIsLoading(false);
    };
    init();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <Wrapper>
      <SellerHeader />
      {isLoading ? <Loading /> : <CoupleList dataList={orderList} />}
    </Wrapper>
  );
}
