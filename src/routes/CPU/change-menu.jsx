import styled from "styled-components";
import { CPUHeader } from "../../components/CPU/cpu-header";
import { useEffect, useState } from "react";
import { CPUFirebase } from "../../features/CPU-firebase-interaction";
import { onSnapshot } from "firebase/firestore";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #f9f9f9;
`;

const StyledCPUHeader = styled(CPUHeader)`
  width: 100%; // 너비를 100%로 설정
  margin: 0; // 여백 제거
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
  text-align: center;
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

  &:hover {
    background-color: ${(props) => (props.edit ? "#45a049" : "#e53935")};
  }
`;

export default function ChangeMenu() {
  const [menuList, setMenuList] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editImage, setEditImage] = useState(null);

  const onDeleteButtonClick = async (id) => {
    if (!confirm("메뉴를 삭제하시겠습니까?")) return;
    const index = CPUFirebase.menuList.findIndex((item) => item.id === id);
    if (index !== -1) {
      await CPUFirebase.deleteMenuImage(index);
      CPUFirebase.menuList.splice(index, 1);
      await CPUFirebase.updateFirebaseMenuList();
    }
    window.location.reload();
  };

  const onMenuAddClick = async (e) => {
    e.preventDefault();
    const newId = Date.now();
    let imageDownloadUrl = "";
    let imagePath = "";

    if (image) {
      const uploadResult = await CPUFirebase.uploadMenuImage(newId, image);
      imageDownloadUrl = uploadResult.imageDownloadUrl;
      imagePath = uploadResult.imagePath;
    }

    CPUFirebase.menuList.push({
      menuName: name,
      price: parseInt(price, 10),
      imageDownloadUrl,
      imagePath,
      id: newId,
    });

    await CPUFirebase.updateFirebaseMenuList();
    setName("");
    setPrice("");
    setImage(null);
  };

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleSave = async (id, updatedData) => {
    const index = CPUFirebase.menuList.findIndex((item) => item.id === id);
    if (index !== -1) {
      if (editImage) {
        const uploadResult = await CPUFirebase.uploadMenuImage(
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
      setEditId(null);
      setEditImage(null);
    }
  };

  useEffect(() => {
    let unsubscribe = null;
    const init = async () => {
      await CPUFirebase.init();
      setMenuList(CPUFirebase.menuList);
      unsubscribe = onSnapshot(CPUFirebase.userDocRef, () => {
        setMenuList(CPUFirebase.menuList);
      });
    };
    init();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
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
          type="number"
          placeholder="가격"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <FileInput
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
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
                    type="number"
                    defaultValue={menu.price}
                    onChange={(e) =>
                      (menu.price = parseInt(e.target.value, 10))
                    }
                  />
                ) : (
                  `${menu.price}원`
                )}
              </Td>
              <Td>
                {editId === menu.id ? (
                  <ActionButton edit onClick={() => handleSave(menu.id, menu)}>
                    Save
                  </ActionButton>
                ) : (
                  <ActionButton edit onClick={() => handleEdit(menu.id)}>
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
    </Wrapper>
  );
}
