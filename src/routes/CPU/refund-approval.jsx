import styled from "styled-components";
import { CPUHeader } from "../../components/CPU/cpu-header";
import CoupleList from "../../components/CPU/couple-list";
import OrderElementCPU from "../../components/CPU/order-element-CPU";
import { useEffect, useState } from "react";
import { CPUFirebase } from "../../features/CPU-firebase-interaction";
import { onSnapshot } from "firebase/firestore";
import Loading from "../../components/loading";
import { MINSAPAY_FONT, BORDER_GRAY } from "../../components/theme-definition";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RefundApprovalBox = styled.div`
  width: 100%;
  margin-top: 4vh;
`;

const Input = styled.input.attrs({
  type: "text",
})`
  padding: 10px;
  border: none;
  width: 100%;
  font-size: 3vh;
  @media only screen and (max-width: 700px) {
    font-size: 2vh;
  }
  outline: none;
  border-bottom: 3px solid ${BORDER_GRAY};
  margin-top: 20px;
  font-family: ${MINSAPAY_FONT};

  &:focus {
    border-bottom: 3px solid #444;
  }
`;

export default function RefundApproval() {
  const [refundRequestList, setRefundRequestList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = null;
    const init = async () => {
      // 초기에 잔고, 이미지 로딩
      await CPUFirebase.init();
      await CPUFirebase.kioskImageInit();
      setRefundRequestList(
        CPUFirebase.orderHistory
          .filter((order) => order.refund_request !== 0)
          .toReversed()
          .map((val, index) => (
            <OrderElementCPU
              menuName={val.menu_name}
              userName={val.buyer_name}
              time={val.reception_time}
              status={val.current_state}
              refundRequest={val.refund_request}
              mode={"refund"}
              key={index}
              id={val.order_id}
            />
          )),
      );
      unsubscribe = onSnapshot(CPUFirebase.userDocRef, (doc) => {
        // 나중에 features로 이관할 방법을 찾을 것임
        CPUFirebase.userDoc = doc;
        CPUFirebase.userDocData = doc.data();
        CPUFirebase.orderHistory = JSON.parse(
          CPUFirebase.userDocData.order_history,
        );
        setRefundRequestList(
          CPUFirebase.orderHistory
            .filter((order) => order.refund_request !== 0)
            .toReversed()
            .map((val, index) => (
              <OrderElementCPU
                menuName={val.menu_name}
                userName={val.buyer_name}
                time={val.reception_time}
                status={val.current_state}
                refundRequest={val.refund_request}
                mode={"refund"}
                key={index}
                id={val.order_id}
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

  // const onChange = (event) => {
  //   setBalanceChangeVal(event.target.value);
  // };

  return (
    <Wrapper>
      <CPUHeader />
      <form onSubmit={null}>
        <Input
          // onChange={onChange}
          value={null}
          placeholder="주문자로 검색"
        ></Input>
      </form>
      {isLoading ? (
        <Loading />
      ) : (
        <RefundApprovalBox>
          <CoupleList dataList={refundRequestList} />
        </RefundApprovalBox>
      )}
    </Wrapper>
  );
}
