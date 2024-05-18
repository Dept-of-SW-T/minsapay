import styled from "styled-components";
import { BACKGROUND_GRAY, BORDER_GRAY } from "../theme-definition";
import { useState } from "react";
import deleteImage from "../../images/DeleteMenu.svg";
import { CPUFirebase } from "../../features/CPU-firebase-interaction";

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  width: 654px;
  height: 234px;
  border: 3px solid ${BORDER_GRAY};
  border-radius: 20px;
  background-color: white;
`;
const ImageDiv = styled.span`
  height: 100%;
  aspect-ratio: 1;
  margin-right: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 17px;
  border-bottom-left-radius: 17px;
  font-family: "BMDOHYEON";
  font-size: 20px;
  &.no-image {
    border-left: 0px;
    border-bottom: 0px;
    border-top: 0px;
    border-right: 3px solid ${BORDER_GRAY};
    margin-right: 0px;
  }
`;
const Img = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-top-left-radius: 17px;
  border-bottom-left-radius: 17px;
`;
const ImageChangeDiv = styled.label`
  height: 100%;
  aspect-ratio: 1;
  margin-right: 0px;

  border-top-left-radius: 17px;
  border-bottom-left-radius: 17px;
  border-left: 0px;
  border-bottom: 0px;
  border-top: 0px;
  border-right: 3px solid ${BORDER_GRAY};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: "BMDOHYEON";
  font-size: 20px;

  &:hover {
    cursor: pointer;
    background-color: #f2f2f2;
  }
`;
const ImageUpload = styled.p`
  &:hover {
    cursor: pointer;
  }
`;
const RightDiv = styled.span`
  width: 428px;
  height: 100%;
`;
const DeleteButtonDiv = styled.div`
  height: 62.5px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const DeleteButton = styled.img`
  height: 25px;
  width: 25px;
  margin-top: 10px;
  margin-right: 15px;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;
const TextDiv = styled.div`
  margin-top: 62.5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 49px;
  &.editModeState-mode {
    margin-top: 0px;
    gap: 27.6px;
  }
`;
const Text = styled.div`
  width: 100%;
  font-family: "BMDOHYEON";
  font-size: 30px;
  text-align: center;
`;
const MenuChangeButtonDiv = styled.div`
  width: 100%;
  height: 62.5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
const MenuChangeButton = styled.div`
  border: 3px solid ${BORDER_GRAY};
  border-radius: 40px;
  background-color: ${BACKGROUND_GRAY};
  width: 109px;
  height: 34px;
  font-family: "BMDOHYEON";
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #ddd;
    cursor: pointer;
  }
`;
const Input = styled.input`
  height: 100%;
  width: 257px;
  font-family: "BMDOHYEON";
  font-size: 30px;
  text-align: center;
  border: none;
  outline: none;
  border-bottom: 3px solid ${BORDER_GRAY};
  &:focus {
    border-bottom: 3px solid #444;
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

// add isloading to total page and apply menu
export default function MenuElement({
  menuName,
  imageUrl,
  price,
  editMode = true,
  id,
  onDeleteButtonClick,
}) {
  const [editModeState, setEditModeState] = useState(editMode);
  const [imageUrlState, setImageUrlState] = useState(imageUrl);
  const [menuNameState, setMenuNameState] = useState(menuName);
  const [priceState, setPriceState] = useState(price);
  const [file, setFile] = useState(undefined);
  const onEnableEditModeStateButtonClick = () => {
    setEditModeState(true);
  };
  const onDisableEditModeStateButtonClick = () => {
    for (let i = 0; i < CPUFirebase.menuList.length; i++) {
      if (CPUFirebase.menuList[i].id === id) {
        setMenuNameState(CPUFirebase.menuList[i].menuName);
        setImageUrlState(CPUFirebase.menuList[i].imageDownloadUrl);
        setPriceState(CPUFirebase.menuList[i].price);
        setEditModeState(false);
        break;
      }
    }
  };
  const onApplyButtonClick = async () => {
    // firebase stuff
    for (let i = 0; i < CPUFirebase.menuList.length; i++) {
      if (CPUFirebase.menuList[i].id === id) {
        CPUFirebase.menuList[i].menuName = menuNameState;
        CPUFirebase.menuList[i].price = priceState;
        await CPUFirebase.uploadMenuImage(i, file); // this will retrieve url automatically
        await CPUFirebase.updateFirebaseMenuList();
        setImageUrlState(CPUFirebase.menuList[i].imageDownloadUrl);
        break;
      }
    }
    setEditModeState(false);
  };
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const onMenuNameStateChange = (e) => {
    setMenuNameState(e.target.value);
  };
  const onPriceStateChange = (e) => {
    if (e.target.value === "") {
      setPriceState(0);
      return;
    }
    function isDigit(char) {
      if (
        char === "0" ||
        char === "1" ||
        char === "2" ||
        char === "3" ||
        char === "4" ||
        char === "5" ||
        char === "6" ||
        char === "7" ||
        char === "8" ||
        char === "9"
      )
        return true;
      else return false;
    }
    let isNumber = true;
    for (let i = 0; i < e.target.value.length; i++) {
      isNumber === isNumber && isDigit(e.target.value[i]);
    }
    if (!isNumber) return;
    const val = parseInt(e.target.value);
    if (val < 0 || val > 100000) return;
    setPriceState(val);
  };
  return (
    <Wrapper>
      {editModeState ? (
        <>
          <ImageChangeDiv htmlFor={id}>
            <ImageUpload>
              {imageUrlState === "" ? "이미지 업로드" : "이미지 업로드됨"}
            </ImageUpload>
            <input
              style={{ display: "none" }}
              id={id}
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
          </ImageChangeDiv>
          <RightDiv>
            <DeleteButtonDiv>
              <DeleteButton
                src={deleteImage}
                onClick={onDeleteButtonClick}
                id={id + ".svg"}
              />
            </DeleteButtonDiv>
            <TextDiv className="editModeState-mode">
              <Text>
                메뉴명:{" "}
                <Input
                  onChange={onMenuNameStateChange}
                  value={menuNameState}
                  type="text"
                />
              </Text>
              <Text>
                가격:{" "}
                <Input
                  onChange={onPriceStateChange}
                  value={priceState}
                  type="text"
                  id="priceState"
                />
                원
              </Text>
            </TextDiv>
            <MenuChangeButtonDiv>
              <MenuChangeButton onClick={onDisableEditModeStateButtonClick}>
                돌아가기
              </MenuChangeButton>
              <MenuChangeButton onClick={onApplyButtonClick}>
                적용하기
              </MenuChangeButton>
            </MenuChangeButtonDiv>
          </RightDiv>
        </>
      ) : (
        <>
          <ImageDiv className={imageUrlState === "" ? "no-image" : ""}>
            {imageUrlState === "" ? (
              <p>이미지 없음</p>
            ) : (
              <Img src={imageUrlState} />
            )}
          </ImageDiv>
          <RightDiv>
            <TextDiv>
              <Text>
                메뉴명: {menuNameState === "" ? "없음" : menuNameState}
              </Text>
              <Text>가격: {priceState}원</Text>
            </TextDiv>
            <MenuChangeButtonDiv>
              <MenuChangeButton onClick={onEnableEditModeStateButtonClick}>
                편집하기
              </MenuChangeButton>
            </MenuChangeButtonDiv>
          </RightDiv>
        </>
      )}
    </Wrapper>
  );
}
