import styled from "styled-components";
import OrderElement from "./order-element";
import RefundApprovalElement from "./refund-approval-element";

function splitIntoChunk(arr, chunk) {
  const result = [];
  for (let index = 0; index < arr.length; index += chunk) {
    let tempArray;
    tempArray = arr.slice(index, index + chunk);
    result.push(tempArray);
  }
  return result;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TwoElementDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-items: center;
`;
const DummyElement = styled.div`
  width: 660px;
  height: 90.89px;
  background-color: black;
`;

export default function CoupleList({}) {
  let datalist = [
    <OrderElement
      menuName={"닭발"}
      userName={"김의영"}
      time={"15:58:55"}
      status={"주문요청"}
    />,
    <OrderElement
      menuName={"해물라면"}
      userName={"이감찬"}
      time={"15:58:50"}
      status={"주문요청"}
    />,
    <OrderElement
      menuName={"닭갈비"}
      userName={"조유찬"}
      time={"15:45:45"}
      status={"처리중"}
    />,
    <OrderElement
      menuName={"해물라면"}
      userName={"이감찬"}
      time={"15:45:40"}
      status={"처리완료"}
    />,
    <OrderElement
      menuName={"해물라면"}
      userName={"최정욱"}
      time={"15:44:35"}
      status={"환불요청"}
    />,
    <OrderElement
      menuName={"해물라면"}
      userName={"이감찬"}
      time={"15:43:30"}
      status={"수령완료"}
    />,
    <RefundApprovalElement
      menuName={"해물라면"}
      userName={"조유찬"}
      time={"15:40:25"}
    />,
  ];
  if (datalist.length % 2 !== 0) datalist.push(<DummyElement />);
  const dataCoupled = splitIntoChunk(datalist, 2).map((value) => {
    return (
      <TwoElementDiv>
        {value[0]}
        {value[1]}
      </TwoElementDiv>
    );
  });
  return <Wrapper>{dataCoupled}</Wrapper>;
}
