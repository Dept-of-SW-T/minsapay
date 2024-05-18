import styled from "styled-components";
import { Header } from "../components/CPU/cpu-header";
import CoupleList from "../components/CPU/couple-list";
import MenuElement from "../components/CPU/menu-element";
import MenuAddElement from "../components/CPU/menu-add-element";
import RamenImage from "../temp-images/라면 사진.webp";
import TangSooYookImage from "../temp-images/탕수육 사진.jpg";
import { useEffect, useState } from "react";
import { CPUFirebase } from "../features/CPU-firebase-interaction";

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
  // need to add edit menu feature and use usestate
  const [menuList, setMenuList] = useState([
    /*    <MenuElement
      imageUrl={RamenImage}
      menuName={"라면"}
      price={3000}
      editMode={false}
    />,
    <MenuElement
      imageUrl={TangSooYookImage}
      menuName={"탕수육"}
      price={5000}
      editMode={false}
      />,
      <MenuAddElement/>, */
  ]);
  const onMenuAddClick = () => {};
  useEffect(() => {
    const init = async () => {
      await CPUFirebase.init();
      setMenuList(
        JSON.parse(CPUFirebase.userDocData.menu_list)
          .map((value) => {
            return (
              <MenuElement
                imageUrl={value.image_url}
                menuName={value.name}
                price={value.price}
                editMode={false}
              />
            );
          })
          .concat([<MenuAddElement onClick={onMenuAddClick} />]),
      );
    };
    init();
  }, []);
  return (
    <Wrapper>
      <Header />
      <ChangeMenuBox>
        <CoupleList dataList={menuList} />
      </ChangeMenuBox>
    </Wrapper>
  );
}
