import styled from "styled-components";
import AddQuantity from "../../images/AddQuantity.svg";
import LowerQuantity from "../../images/LowerQuantity.svg";
import { BORDER_GRAY, MINSAPAY_FONT } from "../theme-definition";
import { useState } from "react";

const Wrapper = styled.div`
  width: calc(100% - 0.5vw);
  height: 6vw;
  border: 3px solid ${BORDER_GRAY};
  border-radius: 1.5vw;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ImageContainer = styled.div`
  height: 100%;
  width: 6vw;
  border-top-left-radius: calc(1.5vw - 3px);
  border-bottom-left-radius: calc(1.5vw - 3px);
  overflow: hidden; /* Ensure contents don't overflow */
`;

const MenuImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const NoImage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1vh;
  font-family: ${MINSAPAY_FONT};
  border-right: 3px solid ${BORDER_GRAY};
  background-color: #f0f0f0; /* Background color to distinguish no image */
`;

const MenuInfo = styled.div`
  width: 14vw;
  font-family: ${MINSAPAY_FONT};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1vh;
`;

const MenuName = styled.div`
  font-size: 1.2vw;
  margin-left: 0.7vw;
`;

const MenuPrice = styled.div`
  font-size: 1vw;
  color: #2079ff;
  margin-left: 0.7vw;
`;

const QuantityChange = styled.div`
  width: 3vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Quantity = styled.div`
  font-size: calc(0.8vw + 0.4vh);
  font-family: ${MINSAPAY_FONT};
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
      <ImageContainer>
        {imageDownloadUrl === "" ? (
          <NoImage>이미지 없음</NoImage>
        ) : (
          <MenuImage src={imageDownloadUrl} />
        )}
      </ImageContainer>
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
            setQuantityState(quantityState + 1);
          }}
        />
        <Quantity>{quantityState}</Quantity>
        <QuantityChangeImg
          src={LowerQuantity}
          id={id + ".LQ"}
          onClick={(e) => {
            if (quantityState > 1) {
              onLowerQuantityButtonClick(e);
              setQuantityState(quantityState - 1);
            } else if (quantityState === 1) {
              onOrderElementKioskDelete(e);
            }
          }}
        />
      </QuantityChange>
    </Wrapper>
  );
}
