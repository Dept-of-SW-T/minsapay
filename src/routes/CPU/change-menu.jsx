import styled from "styled-components";
import { CPUHeader } from "../../components/CPU/cpu-header";
import CoupleList from "../../components/CPU/couple-list";
import MenuElement from "../../components/CPU/menu-element";
import MenuAddElement from "../../components/CPU/menu-add-element";
import { useEffect, useState } from "react";
import { CPUFirebase } from "../../features/CPU-firebase-interaction";
import { onSnapshot } from "firebase/firestore";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ChangeMenuBox = styled.div`
  width: 100%;
  height: 88vh;
  margin-top: 4vh;
`;

export default function ChangeMenu() {
  const [menuList, setMenuList] = useState([]); // couple list에 넣은 요소 리스트
  const onDeleteButtonClick = async (e) => {
    if (!confirm("메뉴를 삭제하시겠습니까?")) return;
    const id = parseInt(e.target.id.substring(0, e.target.id.length - 4)); // 메뉴 아이디 가져오기
    for (let i = 0; i < CPUFirebase.menuList.length; i++) {
      if (CPUFirebase.menuList[i].id === id) {
        // 해당하는 메뉴 지우고 업데이트 --> onSnapshot가 호출됨
        await CPUFirebase.deleteMenuImage(i);
        CPUFirebase.menuList.splice(i, 1);
        await CPUFirebase.updateFirebaseMenuList();
        break;
      }
    }
  };
  const onMenuAddClick = async () => {
    const newId = Date.now(); // 현재 시각을 아이디로
    CPUFirebase.menuList.push({
      menuName: "없음",
      price: 0,
      imageDownloadUrl: "",
      imagePath: "",
      id: newId,
    });
    await CPUFirebase.updateFirebaseMenuList(); // onSnapshot가 호출됨
  };
  useEffect(() => {
    // 초반에 초기화
    let unsubscribe = null;
    const init = async () => {
      await CPUFirebase.init();
      setMenuList(
        CPUFirebase.menuList
          .map((value) => {
            return (
              <MenuElement
                imageDownloadUrl={value.imageDownloadUrl}
                menuName={value.menuName}
                price={value.price}
                editMode={false}
                id={value.id}
                onDeleteButtonClick={onDeleteButtonClick}
                key={value.id}
              />
            );
          })
          .concat([<MenuAddElement onClick={onMenuAddClick} key={-1} />]), // 메뉴 로드 한 후 추가 버튼 추가
      );
      unsubscribe = onSnapshot(CPUFirebase.userDocRef, () => {
        // 나중에 features로 이관할 방법을 찾을 것임 // 이미 위의 delete function이 called되었다는 전제 하에 update되어 있음
        setMenuList(
          CPUFirebase.menuList
            .map((value) => {
              return (
                <MenuElement
                  imageDownloadUrl={value.imageDownloadUrl}
                  menuName={value.menuName}
                  price={value.price}
                  editMode={false}
                  id={value.id}
                  onDeleteButtonClick={onDeleteButtonClick}
                  key={value.id}
                />
              );
            })
            .concat([<MenuAddElement onClick={onMenuAddClick} key={-1} />]), // 메뉴 로드 한 후 추가 버튼 추가
        );
      });
    };
    init();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <Wrapper>
      <CPUHeader />
      <ChangeMenuBox>
        <CoupleList dataList={menuList} />
      </ChangeMenuBox>
    </Wrapper>
  );
}
