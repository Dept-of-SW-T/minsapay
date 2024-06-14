import styled from "styled-components";
import { MINSAPAY_BLUE } from "../components/theme-definition";
import { readXlOfEachSheet, writeXlFromData } from "./xlsx-conversion";
import { developerFirebase } from "./developer-firebase";
import { useEffect, useState } from "react";
import cryptoJS from "crypto-js";

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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
const PasswordAndHashed = styled.input`
  width: 40%;
  text-align: center;
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
export default function DeveloperHome() {
  const [hashedPassword, setHashedPassword] = useState("");
  const [data, setData] = useState([]);
  const onXlSubmit = async (e) => {
    const file = e.target.files[0];
    const studentKeys = [
      "user_id",
      "username",
      "password",
      "logged_device",
      "balance",
    ];
    const teamKeys = [
      "user_id",
      "username",
      "password",
      "logged_device",
      "logged_kiosk_device",
      "balance",
      "kiosk_authentication_number",
      "kiosk_image",
      "linked_buyer",
      "menu_list",
      "student_list",
      "order_history",
    ];
    let tmpdata = await readXlOfEachSheet(file); // needs fix
    /*  Empty cells of Excel files are converted to ""  */
    studentKeys.forEach((key) => {
      tmpdata.Students.forEach((users, index) => {
        if (!(key in users)) {
          tmpdata.Students[index][key] = "";
        }
      });
    });
    teamKeys.forEach((key) => {
      tmpdata.Teams.forEach((users, index) => {
        if (!(key in users)) {
          tmpdata.Teams[index][key] = "";
        }
      });
    });
    /*********************************************************/
    setData(tmpdata);
    console.log(data); // need removal
    console.log(tmpdata);
    e.target.value = ""; // 같은 파일 입력해도 반복 실행
    // some change stuff
  };
  const onGetDataClick = async () => {
    const fileName = "database_info.xlsx";
    await developerFirebase.init();
    await writeXlFromData(fileName, developerFirebase.data);
  };
  const onPasswordChange = (e) => {
    if (e.target.value === "") setHashedPassword("");
    else setHashedPassword(cryptoJS.SHA256(e.target.value).toString());
  };
  const onSubmitDataClick = async () => {
    if (!confirm("firebase에 변경사항을 저장하시겠습니까?")) return;
  };
  useEffect(() => {
    async function init() {
      await developerFirebase.init();
      setData(developerFirebase.data);
    }
    init();
  }, []);

  return (
    <Wrapper>
      <p>Developer Home</p>
      <GetDatabaseInfoButton onClick={onGetDataClick}>
        Get Database Info
      </GetDatabaseInfoButton>
      <DatabaseInfoButton htmlFor="xl-submit">
        Upload Database Info
      </DatabaseInfoButton>
      <input
        onChange={onXlSubmit}
        type="file"
        accept=".xls, .xlsx"
        required
        id="xl-submit"
        style={{ display: "none" }}
      />
      <SubmitDatabaseInfoButton onClick={onSubmitDataClick}>
        Submit Database Info
      </SubmitDatabaseInfoButton>
      <PasswordAndHashed
        onChange={onPasswordChange}
        type="text"
        placeholder="Enter Password"
      />
      <PasswordAndHashed type="text" value={hashedPassword} readOnly />
    </Wrapper>
  );
}
