import styled from "styled-components";
import { CPUHeader } from "../../components/CPU/cpu-header";
import { useEffect, useState, useRef } from "react";
import { CPUFirebase } from "../../features/CPU-firebase-interaction";
import { onSnapshot } from "firebase/firestore";
import Loading from "../../components/loading";
import { MINSAPAY_TITLE } from "../../components/theme-definition";
import { loginUtils } from "../../features/login-feature";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
`;

const StyledCPUHeader = styled(CPUHeader)`
  width: 100%;
  margin: 0;
  position: absolute;

  top: 0; /* 상단에 고정 */
  z-index: 1000; /* 다른 요소들 위에 표시되도록 */
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  margin-top: 35px;
`;

const Form = styled.form`
  width: 80%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FileInput = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  color: white;
  background-color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const Table = styled.table`
  width: 90%;
  max-width: 800px;
  margin-top: 50px;
  margin-bottom: 50px;
  border-collapse: collapse;
  background-color: #fff;
  border: 1px solid #ccc;
  font-family: ${MINSAPAY_TITLE};
`;

const Th = styled.th`
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  font-size: 14px;
`;
const Td = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  text-align: center; /* 텍스트 가운데 정렬 */
  vertical-align: middle; /* 세로 가운데 정렬 */
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  font-size: 12px;
  color: white;
  background-color: ${(props) => (props.edit ? "#4CAF50" : "#f44336")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
  text-align: center; /* 버튼 가운데 정렬 */

  &:hover {
    background-color: ${(props) => (props.edit ? "#45a049" : "#e53935")};
  }
`;

export default function ChangeMenu() {
  const [menuList, setMenuList] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [editPrice, setEditPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editImage, setEditImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null); // Reference to the file input element

  // Assuming boothId is determined somehow, for example, from the user's team or some other context.
  const boothId = loginUtils.getUserID() || "defaultBooth"; // Replace with actual logic to get boothId

  const onDeleteButtonClick = async (id) => {
    if (!confirm("메뉴를 삭제하시겠습니까?")) return;
    setIsLoading(true);
    const index = CPUFirebase.menuList.findIndex((item) => item.id === id);
    if (index !== -1) {
      await CPUFirebase.deleteMenuImage(index);
      CPUFirebase.menuList.splice(index, 1);
      await CPUFirebase.updateFirebaseMenuList();
    }
    setIsLoading(false);
  };

  const onPriceChange = (e) => {
    if (e.target.value === "") {
      setPrice(0);
      return;
    }

    const isDigit = (char) => {
      return /\d/.test(char);
    };

    let isNumber = true;
    for (let i = 0; i < e.target.value.length; i++) {
      isNumber = isNumber && isDigit(e.target.value[i]);
    }
    if (!isNumber) return;
    const val = parseInt(e.target.value);
    if (val < 0 || val > 100000) return;
    setPrice(val);
  };

  const onMenuAddClick = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const newId = Date.now();
    let imageDownloadUrl = "";
    let imagePath = "";

    if (image) {
      const uploadResult = await CPUFirebase.uploadMenuImage(
        boothId,
        newId,
        image,
      );
      imageDownloadUrl = uploadResult.imageDownloadUrl;
      imagePath = uploadResult.imagePath;
    }

    CPUFirebase.menuList.push({
      menuName: name,
      price: price,
      imageDownloadUrl,
      imagePath,
      id: newId,
    });

    await CPUFirebase.updateFirebaseMenuList();
    setMenuList([...CPUFirebase.menuList]);
    setName("");
    setPrice(0);
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input field
    }
    setIsLoading(false);
  };

  const handleEdit = (id, price) => {
    setEditId(id);
    setEditPrice(price);
  };

  const handleSave = async (id, updatedData) => {
    setIsLoading(true);
    const index = CPUFirebase.menuList.findIndex((item) => item.id === id);
    if (index !== -1) {
      if (editImage) {
        const uploadResult = await CPUFirebase.uploadMenuImage(
          boothId,
          index,
          editImage,
        );
        updatedData.imageDownloadUrl = uploadResult.imageDownloadUrl;
        updatedData.imagePath = uploadResult.imagePath;
      }

      CPUFirebase.menuList[index] = {
        ...CPUFirebase.menuList[index],
        ...updatedData,
      };

      await CPUFirebase.updateFirebaseMenuList();
      setMenuList([...CPUFirebase.menuList]);
      setEditId(null);
      setEditImage(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let unsubscribe = null;
    const init = async () => {
      await CPUFirebase.init();
      setMenuList(CPUFirebase.menuList);
      unsubscribe = onSnapshot(CPUFirebase.userDocRef, async () => {
        await CPUFirebase.init();
        setMenuList(CPUFirebase.menuList);
      });
      setIsLoading(false);
    };
    init();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <StyledCPUHeader />
          <Title>메뉴 추가 & 수정</Title>
          <Form onSubmit={onMenuAddClick}>
            <Input
              type="text"
              placeholder="메뉴명"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="가격"
              value={price}
              onChange={onPriceChange}
              required
            />
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              ref={fileInputRef} // Add the ref to the file input
            />
            <Button type="submit">메뉴 추가</Button>
          </Form>
          <Table>
            <thead>
              <tr>
                <Th>Photo</Th>
                <Th>메뉴명</Th>
                <Th>가격</Th>
                <Th>편집</Th>
              </tr>
            </thead>
            <tbody>
              {menuList.map((menu, index) => (
                <tr key={index}>
                  <Td>
                    {menu.imageDownloadUrl ? (
                      <img
                        src={menu.imageDownloadUrl}
                        alt="Menu"
                        width="50"
                        height="50"
                      />
                    ) : (
                      "No Image"
                    )}
                    {editId === menu.id && (
                      <FileInput
                        type="file"
                        accept="image/*"
                        onChange={(e) => setEditImage(e.target.files[0])}
                      />
                    )}
                  </Td>
                  <Td>
                    {editId === menu.id ? (
                      <Input
                        type="text"
                        defaultValue={menu.menuName}
                        onChange={(e) => (menu.menuName = e.target.value)}
                      />
                    ) : (
                      menu.menuName
                    )}
                  </Td>
                  <Td>
                    {editId === menu.id ? (
                      <Input
                        type="text"
                        value={editPrice}
                        onChange={(e) => {
                          if (e.target.value === "") {
                            setEditPrice(0);
                            return;
                          }

                          const isDigit = (char) => {
                            return /\d/.test(char);
                          };

                          let isNumber = true;
                          for (let i = 0; i < e.target.value.length; i++) {
                            isNumber = isNumber && isDigit(e.target.value[i]);
                          }
                          if (!isNumber) return;
                          const val = parseInt(e.target.value);
                          if (val < 0 || val > 100000) return;
                          setEditPrice(val);
                          menu.price = val;
                        }}
                      />
                    ) : (
                      `${menu.price}원`
                    )}
                  </Td>
                  <Td>
                    {editId === menu.id ? (
                      <ActionButton
                        edit
                        onClick={() => handleSave(menu.id, menu)}
                      >
                        Save
                      </ActionButton>
                    ) : (
                      <ActionButton
                        edit
                        onClick={() => handleEdit(menu.id, menu.price)}
                      >
                        Edit
                      </ActionButton>
                    )}
                    <ActionButton onClick={() => onDeleteButtonClick(menu.id)}>
                      Delete
                    </ActionButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Wrapper>
  );
}
