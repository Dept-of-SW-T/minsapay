import styled from "styled-components";
import { MINSAPAY_BLUE } from "../components/theme-definition";
import { readXlOfEachSheet, writeXlFromData } from "./xlsx-conversion";
import { developerFirebase } from "./developer-firebase";
import { useState } from "react";
import cryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { loginUtils } from "../features/login-feature";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 40px;
`;

const DatabaseInfoButton = styled.label`
  width: 40%;
  height: 5vh;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${MINSAPAY_BLUE};
  color: white;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
const GetDatabaseInfoButton = styled.div`
  width: 40%;
  height: 5vh;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${MINSAPAY_BLUE};
  color: white;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
const SubmitDatabaseInfoButton = styled.div`
  width: 40%;
  height: 5vh;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${MINSAPAY_BLUE};
  color: white;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
const Logout = styled.div`
  width: 40%;
  height: 5vh;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${MINSAPAY_BLUE};
  color: white;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export default function DeveloperHome() {
  const [data, setData] = useState({});
  const [remainingTime, setRemainingTime] = useState(0);
  const [clickable, setClickable] = useState(true);
  const [uploadable, setUploadable] = useState(true);
  const navigate = useNavigate();
  const onXlUpload = async (e) => {
    setUploadable(false);
    const file = e.target.files[0];
    let xldata = await readXlOfEachSheet(file); // needs fix
    /*  Empty cells of Excel files are converted to ""  */
    let resultdata = {};
    await developerFirebase.init();
    developerFirebase.collectionNameList.forEach((collectionName) => {
      resultdata[collectionName] = {};
      xldata[collectionName].forEach((val, index) => {
        if (val.user_id in developerFirebase.data[collectionName]) {
          // original user
          resultdata[collectionName][val.user_id] =
            developerFirebase.data[collectionName][val.user_id];
          for (const key of Object.keys(xldata[collectionName][index])) {
            if (key === "user_id") continue;
            if (key === "balance")
              resultdata[collectionName][val.user_id][key] = parseInt(
                xldata[collectionName][index][key],
              );
            else
              resultdata[collectionName][val.user_id][key] = String(
                xldata[collectionName][index][key],
              );
          }
        } else {
          resultdata[collectionName][val.user_id] =
            developerFirebase.emptyUser(collectionName);
          for (const key of Object.keys(xldata[collectionName][index])) {
            if (key === "user_id") continue;
            if (key === "balance")
              resultdata[collectionName][val.user_id][key] = parseInt(
                xldata[collectionName][index][key],
              );
            else
              resultdata[collectionName][val.user_id][key] = String(
                xldata[collectionName][index][key],
              );
          }
        }
        resultdata[collectionName][val.user_id]["password"] = cryptoJS
          .SHA256(resultdata[collectionName][val.user_id]["password_unhashed"])
          .toString();
      });
    });
    setData(resultdata);
    console.log(resultdata);
    e.target.value = ""; // 같은 파일 입력해도 반복 실행 */
    setUploadable(true);
  };
  const onGetDataClick = async () => {
    setClickable(false);
    setRemainingTime(5);
    let rm = 5;
    const intervalId = setInterval(async () => {
      if (rm < 0) {
        setClickable(true);
        clearInterval(intervalId);
      } else if (rm === 0) {
        rm--;
        const fileName = "database_info.xlsx";
        await developerFirebase.init();
        await writeXlFromData(fileName, developerFirebase.subData);
      } else {
        rm--;
        setRemainingTime(rm);
      }
    }, 1000);
  };
  const onSubmitDataClick = async () => {
    if (!confirm("firebase에 변경사항을 저장하시겠습니까?")) return;
    if (Object.keys(data).length === 0) {
      alert("업로드된 데이터가 없습니다");
      return;
    }
    console.log(data);
    await developerFirebase.init();
    await developerFirebase.writeDataToFirebase(data);
  };
  const onLogoutClick = async () => {
    if (!confirm("로그아웃 하시겠습니까?")) return;
    await loginUtils.signOut();
    navigate("../");
  };
  return (
    <Wrapper>
      <p>Developer Home</p>
      <GetDatabaseInfoButton onClick={clickable ? onGetDataClick : null}>
        {remainingTime === 0
          ? "Get Database Info"
          : "Download starting in " + String(remainingTime) + " seconds"}
      </GetDatabaseInfoButton>
      <DatabaseInfoButton htmlFor="xl-submit">
        {uploadable ? "Upload Database Info" : "Uploading"}
      </DatabaseInfoButton>
      <input
        onChange={uploadable ? onXlUpload : null}
        type="file"
        accept=".xls, .xlsx"
        required
        id="xl-submit"
        style={{ display: "none" }}
      />
      <SubmitDatabaseInfoButton onClick={uploadable ? onSubmitDataClick : null}>
        {uploadable ? "Submit Database Info" : "Uploading"}
      </SubmitDatabaseInfoButton>
      <Logout onClick={onLogoutClick}>Log Out</Logout>
    </Wrapper>
  );
}
