import styled from "styled-components";
import { BORDER_GRAY, BUTTON_SHADOW } from "../theme-definition";
import AddToOrder from "../../images/AddToOrder.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: flex;
  flex-direction: column;
  width: 230px;
  height: 298px;
  border-radius: 30px;
  background-color: white;
  box-shadow: 0px 4px 6px 1px ${BUTTON_SHADOW};
`;
const NoImage = styled.div`
  width: 100%;
  height: calc(230px - 3px);
  border-bottom: 3px solid ${BORDER_GRAY};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "BMDOHYEON";
  font-size: 25px;
`;
const MenuImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;
const BottomDiv = styled.div`
  width: 100%;
  height: calc(298px - 230px);
  display: flex;
`;
const AddOrderBox = styled.div`
  height: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const AddOrder = styled.img`
  width: 45px;
  margin-right: 10px;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;
const TextArea = styled.div`
  width: calc(100% - (298px - 230px));
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 20px;
  font-family: "BMDOHYEON";
`;
const MenuName = styled.div`
  height: 29px;
  font-size: 24px;
  display: flex;
  align-items: center;
`;
const MenuPrice = styled.div`
  height: 21px;
  font-size: 18px;
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
  show = true,
}) {
  return (
    <Wrapper style={{ visibility: `${show ? "visible" : "hidden"}` }}>
      {menuImageUrl === "" ? (
        <NoImage>이미지 없음</NoImage>
      ) : (
        <MenuImage src={menuImageUrl} />
      )}
      <BottomDiv>
        <TextArea>
          <MenuName>{menuName}</MenuName>
          <MenuPrice>{price}원</MenuPrice>
        </TextArea>
        <AddOrderBox>
          <AddOrder
            src={AddToOrder}
            id={id + ".svg"}
            onClick={onAddToOrderClick}
          />
        </AddOrderBox>
      </BottomDiv>
    </Wrapper>
  );
}
