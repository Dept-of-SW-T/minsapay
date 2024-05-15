import styled from "styled-components";
import OrderElement from "./order-element";

export default function CoupleList({}) {
  let datalist = [
    <OrderElement
      menuName={"해물라면"}
      userName={"이감찬"}
      time={"15:58:50"}
      status={"처리 중"}
    />,
    <OrderElement
      menuName={"해물라면"}
      userName={"이감찬"}
      time={"15:45:45"}
      status={"처리 중"}
    />,
    <OrderElement
      menuName={"해물라면"}
      userName={"이감찬"}
      time={"15:45:40"}
      status={"처리 중"}
    />,
  ];

  return <>{datalist}</>;
}
