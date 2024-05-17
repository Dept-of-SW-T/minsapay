import styled from "styled-components";
import { Header } from "../components/CPU/cpu-header";
import CoupleList from "../components/CPU/couple-list";
import MenuElement from "../components/CPU/menu-element";
import MenuAddElement from "../components/CPU/menu-add-element";

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
    <MenuElement
      image_url={
        "https://firebasestorage.googleapis.com/v0/b/minsapay.appspot.com/o/kwagibu%2Fmenu_image%2F%EB%9D%BC%EB%A9%B4%2F%EB%9D%BC%EB%A9%B4%20%EC%82%AC%EC%A7%84.webp?alt=media&token=2306f2fe-81d6-420c-b4d3-c0125be09bdf"
      }
      menu_name={"라면"}
      price={3000}
    />,
    <MenuElement
      image_url={
        "https://firebasestorage.googleapis.com/v0/b/minsapay.appspot.com/o/kwagibu%2Fmenu_image%2F%EB%9D%BC%EB%A9%B4%2F%EB%9D%BC%EB%A9%B4%20%EC%82%AC%EC%A7%84.webp?alt=media&token=2306f2fe-81d6-420c-b4d3-c0125be09bdf"
      }
      menu_name={"라면"}
      price={3000}
    />,
    <MenuAddElement />,
  ];
  return (
    <Wrapper>
      <Header />
      <ChangeMenuBox>
        <CoupleList dataList={menuList} />
      </ChangeMenuBox>
    </Wrapper>
  );
}
