import styled from "styled-components";
import AddQuantity from "../../images/AddQuantity.svg";
import LowerQuantity from "../../images/LowerQuantity.svg";
import { BORDER_GRAY /* BUTTON_SHADOW */ } from "../theme-definition";
import { useState } from "react";
// 반응형으로!!
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
  height: calc(110px - 6px);
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
const QuantityChange = styled.div`
  width: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const Quantity = styled.div`
  font-size: 20px;
  font-family: "BMDOHYEON";
  display: flex;
  flex-direction: column;
  opacity: 0.6;
`;

const QuantityChangeImg = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

export default function OrderElementKiosk({
  // 아직 덜만듦 ui도 짜야 하고 여러가지 수량 기능? 등등 추가해야 함
  imageDownloadUrl,
  menuName,
  price,
  quantity,
  id,
  onAddQuantityButtonClick,
  onLowerQuantityButtonClick,
  onOrderElementKioskDelete,
}) {
  const [quantityState, setQuantityState] = useState(quantity);
  return (
    <Wrapper>
      {imageDownloadUrl === "" ? (
        <NoImage>이미지 없음</NoImage>
      ) : (
        <MenuImage src={imageDownloadUrl} />
      )}
      <MenuInfo>
        <MenuName>{menuName}</MenuName>
        <MenuPrice>{price}원</MenuPrice>
      </MenuInfo>
      <QuantityChange>
        <QuantityChangeImg
          src={AddQuantity}
          id={id + ".AQ"}
          onClick={(e) => {
            onAddQuantityButtonClick(e);
            setQuantityState((curr) => curr + 1);
          }}
        />
        <Quantity>{quantityState}</Quantity>
        <QuantityChangeImg
          src={LowerQuantity}
          id={id + ".LQ"}
          onClick={(e) => {
            if (quantityState > 1) {
              onLowerQuantityButtonClick(e);
              setQuantityState((curr) => curr - 1);
            } else if (quantityState === 1) {
              onOrderElementKioskDelete(e);
            }
          }}
        />
      </QuantityChange>
    </Wrapper>
  );
}
