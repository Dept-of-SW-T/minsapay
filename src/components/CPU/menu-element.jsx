import styled from "styled-components";
import { BACKGROUND_GRAY, BORDER_GRAY } from "../theme-definition";
import { useState } from "react";
import deleteImage from "../../images/DeleteMenu.svg";
import { CPUFirebase } from "../../features/CPU-firebase-interaction";

// 적용 시 로딩하기 화면 넣어야 함 // 감찬이처럼 성격 급한 애들 방지를 위하여

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
  // 요소들은 오직 초기화를 위해서만 나머지는 요소이름 + State에서 조절
  menuName,
  imageDownloadUrl, // 실제로 이미지를 접할 수 있는 url
  price,
  editMode, // true면 편집 모드로
  id, // 메뉴의 아이디 --> 메뉴 이름은 곂칠 수 있으므로
  onDeleteButtonClick, // delete button의 경우 외부 menu list에서도 지워야 하므로 인자로 받아준다.
}) {
  const [editModeState, setEditModeState] = useState(editMode);
  const [imageDownloadUrlState, setImageDownloadUrlState] =
    useState(imageDownloadUrl);
  const [menuNameState, setMenuNameState] = useState(menuName);
  const [priceState, setPriceState] = useState(price);
  const [file, setFile] = useState(undefined);
  const onEnableEditModeStateButtonClick = () => {
    // 편집하기 버튼
    setEditModeState(true);
  };
  const onDisableEditModeStateButtonClick = () => {
    // 돌아가기 버튼 --> 다시 기존의 수정사항 버리기
    for (let i = 0; i < CPUFirebase.menuList.length; i++) {
      if (CPUFirebase.menuList[i].id === id) {
        setMenuNameState(CPUFirebase.menuList[i].menuName);
        setImageDownloadUrlState(CPUFirebase.menuList[i].imageDownloadUrl);
        setPriceState(CPUFirebase.menuList[i].price);
        setEditModeState(false);
        break;
      }
    }
  };
  const onApplyButtonClick = async () => {
    // 적용하기 버튼
    for (let i = 0; i < CPUFirebase.menuList.length; i++) {
      if (CPUFirebase.menuList[i].id === id) {
        CPUFirebase.menuList[i].menuName = menuNameState;
        CPUFirebase.menuList[i].price = priceState;
        await CPUFirebase.uploadMenuImage(i, file); // this will retrieve url automatically
        await CPUFirebase.updateFirebaseMenuList();
        setImageDownloadUrlState(CPUFirebase.menuList[i].imageDownloadUrl);
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
    // input이 0이상 100000 이하,
    if (e.target.value === "") {
      setPriceState(0);
      return;
    }
    function isDigit(char) {
      // 주어진 character가 숫자인지 판단
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
      // 모든 character가 digit이어야만 true 반환
      isNumber === isNumber && isDigit(e.target.value[i]);
    }
    if (!isNumber) return; // 0~9가 아닌 input은 기록되지 않는다
    const val = parseInt(e.target.value); // 기록된 price를 int로 바꾸어서
    if (val < 0 || val > 100000) return; // 주어진 범위를 벗어나면 return
    setPriceState(val); // price는 number type를 가진다.
  };
  return (
    <Wrapper>
      {editModeState ? ( // 편집모드인 경우
        <>
          <ImageChangeDiv htmlFor={id}>
            <ImageUpload>
              {imageDownloadUrlState === ""
                ? "이미지 업로드"
                : "이미지 업로드됨"}
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
        // 편집 모드가 아닌 경우
        <>
          <ImageDiv className={imageDownloadUrlState === "" ? "no-image" : ""}>
            {imageDownloadUrlState === "" ? (
              <p>이미지 없음</p>
            ) : (
              <Img src={imageDownloadUrlState} />
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
