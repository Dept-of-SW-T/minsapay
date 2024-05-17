import styled from "styled-components";
import OrderElement from "./order-element";

export default function CoupleList({}) {
  let datalist = [
    // needs key
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
    <OrderElement
      menuName={"해물라면"}
      userName={"조유찬"}
      time={"15:40:25"}
      status={"환불완료"}
    />,
  ];

  return <>{datalist}</>;
}
