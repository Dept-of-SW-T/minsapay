import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sellerFirebase } from "../../features/seller-firebase-interaction";
import OrderElementSeller from "../../components/seller/order-element-seller";
import CoupleList from "../../components/CPU/couple-list";
import { SellerHeader } from "../../components/seller/seller-header";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default function SellerProcessing() {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const currentTeam = useParams().id;
  useEffect(() => {
    // let unsubscribe = null;
    const init = async () => {
      await sellerFirebase.getTeamData(currentTeam);
      setOrderList(
        sellerFirebase.orderHistory
          .toReversed()
          .map((val, index) => (
            <OrderElementSeller
              menuName={val.menu_name}
              teamName={val.team_name}
              price={val.price}
              status={val.current_state}
              id={val.order_id}
              key={index}
            />
          )),
      );
    };
    init();
  }, []);
  return (
    <Wrapper>
      <SellerHeader />
      <CoupleList dataList={orderList} />
      <button onClick={() => navigate("./buyer-payment")}>
        To Buyer Payment
      </button>
    </Wrapper>
  );
}
