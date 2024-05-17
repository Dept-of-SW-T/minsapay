import styled from "styled-components";
import { Header } from "../components/CPU/cpu-header";
import CoupleList from "../components/CPU/couple-list";
import MenuElement from "../components/CPU/menu-element";
import MenuAddElement from "../components/CPU/menu-add-element";
import RamenImage from "../temp-images/라면 사진.webp";
import TangSooYookImage from "../temp-images/탕수육 사진.jpg";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ChangeMenuBox = styled.div`
  width: 1355px;
  margin-top: 20px;
`;

export default function ChangeMenu() {
  const menuList = [
    <MenuElement image_url={RamenImage} menu_name={"라면"} price={3000} />,
    <MenuElement
      image_url={TangSooYookImage}
      menu_name={"탕수육"}
      price={5000}
    />,
    <MenuAddElement />,
  ]; // firebase and add usestate
  return (
    <Wrapper>
      <Header />
      <ChangeMenuBox>
        <CoupleList dataList={menuList} />
      </ChangeMenuBox>
    </Wrapper>
  );
}
