import styled from "styled-components";
import { BORDER_GRAY, BUTTON_SHADOW, MINSAPAY_FONT } from "../theme-definition";
import AddToOrder from "../../images/AddToOrder.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  aspect-ratio: 3;
  border-radius: 10%;
  background-color: white;
  width: 15vw;
  box-shadow: 0px 4px 6px 1px ${BUTTON_SHADOW};
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1.2;
  border-bottom: 3px solid ${BORDER_GRAY};
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${MINSAPAY_FONT};
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
  background-color: #f0f0f0;
`;

const MenuImage = styled.img`
  width: 100%;
  height: 100%;
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
`;

const BottomDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AddOrderBox = styled.div`
  height: 100%;
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const AddOrder = styled.img`
  width: 75%;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const TextArea = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 7%;
  font-family: ${MINSAPAY_FONT};
`;

const MenuName = styled.div`
  height: 40%;
  width: 100%;
  font-size: 1.2vw;
  display: flex;
  align-items: center;
`;

const MenuPrice = styled.div`
  height: 30%;
  width: 100%;
  font-size: 1vw;
  display: flex;
  align-items: center;
  color: #2079ff;
`;

export default function MenuDisplayElement({
  menuImageUrl,
  menuName,
  price,
  id,
  onAddToOrderClick,
}) {
  return (
    <Wrapper>
      <ImageWrapper>
        {menuImageUrl === "" ? (
          <NoImage onClick={onAddToOrderClick}>
            <p
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: "100%",
              }}
            >
              이미지 없음
            </p>
          </NoImage>
        ) : (
          <MenuImage onClick={onAddToOrderClick} src={menuImageUrl} />
        )}
      </ImageWrapper>
      <BottomDiv onClick={onAddToOrderClick}>
        <TextArea>
          <MenuName>{menuName}</MenuName>
          <MenuPrice>{price}원</MenuPrice>
        </TextArea>
        <AddOrderBox>
          <AddOrder src={AddToOrder} id={id + ".svg"} />
        </AddOrderBox>
      </BottomDiv>
    </Wrapper>
  );
}
