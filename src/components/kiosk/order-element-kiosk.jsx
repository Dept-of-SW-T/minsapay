import styled from "styled-components";
import AddQuantity from "../../images/AddQuantity.svg";
import LowerQuantity from "../../images/LowerQuantity.svg";
import { BORDER_GRAY, BUTTON_SHADOW } from "../theme-definition";

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
const QuantityChange = styled.div`
  width: 60px;
`;

export default function OrderElementKiosk({
  menuImageUrl,
  menuName,
  price,
  quantity,
  id,
}) {
  return (
    <Wrapper>
      <MenuImage src={menuImageUrl} />
      <MenuInfo>
        <MenuName>{menuName}</MenuName>
        <MenuPrice>{price}원</MenuPrice>
      </MenuInfo>
    </Wrapper>
  );
}
