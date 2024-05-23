import styled from "styled-components";
/* import AddQuantity from "../../images/AddQuantity.svg";
import LowerQuantity from "../../images/LowerQuantity.svg"; */ // 위아래 화살표
import { BORDER_GRAY /* BUTTON_SHADOW */ } from "../theme-definition";

const Wrapper = styled.div`
  width: calc(100% - 6px);
  height: calc(110px - 6px);
  border: 3px solid ${BORDER_GRAY};
  border-radius: 30px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MenuImage = styled.img`
  height: 100%;
  aspect-ratio: 1;
  border-top-left-radius: calc(30px - 3px);
  border-bottom-left-radius: calc(30px - 3px);
`;
const NoImage = styled.div`
  height: 100%;
  aspect-ratio: 1;
  border-top-left-radius: calc(30px - 3px);
  border-bottom-left-radius: calc(30px - 3px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: "BMDOHYEON";
  border-right: 3px solid ${BORDER_GRAY};
`;

const MenuInfo = styled.div`
  width: 139px;
  font-family: "BMDOHYEON";
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;
const MenuName = styled.div`
  font-size: 20px;
  margin-left: 10px;
`;
const MenuPrice = styled.div`
  font-size: 15px;
  color: #2079ff;
  margin-left: 10px;
`;
/* const QuantityChange = styled.div`
  width: 60px;
`; */

export default function OrderElementKiosk({
  // 아직 덜만듦 ui도 짜야 하고 여러가지 수량 기능? 등등 추가해야 함
  menuImageUrl,
  menuName,
  price,
  /*   quantity,
  id, */
}) {
  return (
    <Wrapper>
      {menuImageUrl === "" ? (
        <NoImage>이미지 없음</NoImage>
      ) : (
        <MenuImage src={menuImageUrl} />
      )}
      <MenuInfo>
        <MenuName>{menuName}</MenuName>
        <MenuPrice>{price}원</MenuPrice>
      </MenuInfo>
    </Wrapper>
  );
}
