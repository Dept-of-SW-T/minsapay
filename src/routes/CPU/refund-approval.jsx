import styled from "styled-components";
import { CPUHeader } from "../../components/CPU/cpu-header";
import CoupleList from "../../components/CPU/couple-list";
import OrderElementCPU from "../../components/CPU/order-element-CPU";
import { useEffect, useState } from "react";
import { CPUFirebase } from "../../features/CPU-firebase-interaction";
import { onSnapshot } from "firebase/firestore";
import Loading from "../../components/loading";

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
export default function RefundApproval() {
  const [refundRequestList, setRefundRequestList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let unsubscribe = null;
    const init = async () => {
      // 초기에 잔고, 이미지 로딩
      await CPUFirebase.init();
      await CPUFirebase.kioskImageInit();
      let refundRequestHistory = [];
      for (let i = 0; i < CPUFirebase.orderHistory.length; i++) {
        if (CPUFirebase.orderHistory[i].current_state === "환불요청") {
          refundRequestHistory.push(CPUFirebase.orderHistory[i]);
        }
      }
      setRefundRequestList(
        refundRequestHistory
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
        refundRequestHistory = [];
        for (let i = 0; i < CPUFirebase.orderHistory.length; i++) {
          if (CPUFirebase.orderHistory[i].refund_request !== 0) {
            refundRequestHistory.push(CPUFirebase.orderHistory[i]);
          }
        }
        setRefundRequestList(
          refundRequestHistory
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
  return (
    <Wrapper>
      <CPUHeader />
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
