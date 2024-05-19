import styled from "styled-components";
import { Header } from "../components/CPU/cpu-header";
import CoupleList from "../components/CPU/couple-list";
import MenuElement from "../components/CPU/menu-element";
import MenuAddElement from "../components/CPU/menu-add-element";
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
  const [menuList, setMenuList] = useState([]);
  const onDeleteButtonClick = async (e) => {
    if (!confirm("메뉴를 삭제하시겠습니까?")) return;
    const id = parseInt(e.target.id.substring(0, e.target.id.length - 4));
    for (let i = 0; i < CPUFirebase.menuList.length; i++) {
      if (CPUFirebase.menuList[i].id === id) {
        await CPUFirebase.deleteMenuImage(i);
        CPUFirebase.menuList.splice(i, 1);
        await CPUFirebase.updateFirebaseMenuList();
        break;
      }
    }
    window.location.reload();
  };
  const onMenuAddClick = async () => {
    const newId = Date.now();
    CPUFirebase.menuList.push({
      menuName: "없음",
      price: 0,
      imageDownloadUrl: "",
      imagePath: "",
      id: newId,
    });
    await CPUFirebase.updateFirebaseMenuList();
    setMenuList((prev) => {
      let prevCopy = Object.assign([], prev);
      prevCopy.splice(
        prev.length - 1,
        0,
        <MenuElement
          menuName={"없음"}
          price={0}
          imageUrl={""}
          editMode={false}
          id={newId}
          onDeleteButtonClick={onDeleteButtonClick}
        />,
      );
      return prevCopy;
    });
  };
  useEffect(() => {
    const init = async () => {
      await CPUFirebase.init();
      setMenuList(
        CPUFirebase.menuList
          .map((value) => {
            return (
              <MenuElement
                imageUrl={value.imageDownloadUrl}
                menuName={value.menuName}
                price={value.price}
                editMode={false}
                id={value.id}
                onDeleteButtonClick={onDeleteButtonClick}
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
