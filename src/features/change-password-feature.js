import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { database } from "../firebase";
import cryptoJS from "crypto-js";
import { getCookie, removeCookie, setCookie } from "./cookies";

const auth = {
  currentUser: null, // 로그인 되어 있을 때에는 객체이고 로그아웃되어 있을 때에는 null이다.
  error: "", // auth 함수 처리 과정중의 모든 error들을 다 가져온다 --> if(auth.함수) { 에러 처리 코드 } // error를 초기화하고 함수를 돌리거나 함수 자체로 true false를 return하도록

  async syncWithStoredLoginInfo() {
    // cookie에 저장된 loginInfo와 동기화 --> 새로고침되었을 때의 상황에서도 cookie를 이용하여 다시 로컬 객체를 동기화시키는 역할
    const loginInfo = await getCookie("login_info");
    if (loginInfo !== undefined) {
      // 이미 로그인된 경우
      this.currentUser = loginInfo;
    }
  },

  signOut() {
    return new Promise((resolve) => {
      this.currentUser = null;
      this.error = ""; // auth 객체 초기화
      removeCookie("login_info"); // 로그아웃 시 cookie 삭제
      resolve();
    });
  },

  async developerSignIn(password) {
    await this.signOut();
    const developerDoc = await getDoc(doc(database, "Admin", "Developer"));
    const developerDocData = developerDoc.data();
    if (developerDocData.password !== cryptoJS.SHA256(password).toString()) {
      return false;
    }
    this.currentUser = {
      userType: "developer",
    };
    await setCookie("login_info", this.currentUser); // cookie 설정
    return true;
  },

  async signIn(userID, password) {
    await this.signOut();
    function onlyDigits(userID) {
      let result = true;
      for (let i = 0; i < userID.length; i++) {
        result = result && 0 <= userID[i] && userID[i] <= 9; // check if every character is a digit
      }
      return result;
    }

    async function queryIDfromUsersDatabase(id, students) {
      let documentIndex = -1;
      for (let i = 0; i < students.docs.length; i++) {
        // 학생 firestore의 학생 아이디 목록과 대조
        if (id === students.docs[i].id) {
          documentIndex = i;
          break;
        }
      }
      return documentIndex;
    }

    if (onlyDigits(userID)) {
      // If true, Buyer
      const studentsQuery = query(collection(database, "Students"));
      const students = await getDocs(studentsQuery);
      const documentIndex = await queryIDfromUsersDatabase(userID, students);
      if (documentIndex === -1) {
        this.error = "존재하지 않는 사용자 아이디입니다.";
        return false;
      }
      const userData = students.docs[documentIndex].data();
      const encryptedPassword = cryptoJS.SHA256(password).toString();
      if (encryptedPassword === userData.password) {
        this.currentUser = {
          userType: "buyer",
          userID: userID,
          username: userData.username,
        };
      } else {
        this.error = "잘못된 비밀번호입니다.";
        return false;
      }
    } else {
      // 부스 로그인
      if (!userID.includes("@")) {
        this.error = "부적절한 아이디입니다.";
        return false;
      }
      const userType = userID.substring(userID.indexOf("@") + 1, userID.length); // @ 뒤의 usertype를 그대로 잘라내기
      if (userType !== "CPU" && userType !== "kiosk" && userType !== "seller") {
        this.error = "부적절한 아이디입니다.";
        return false;
      }
      userID = userID.substring(0, userID.indexOf("@")); // @ 이전의 id를 저장
      if (userType === "seller") {
        const studentsQuery = query(collection(database, "Students"));
        const students = await getDocs(studentsQuery);
        const documentIndex = await queryIDfromUsersDatabase(userID, students);
        if (documentIndex === -1) {
          this.error = "존재하지 않는 사용자 아이디입니다.";
          return false;
        }
        const userData = students.docs[documentIndex].data();
        const encryptedPassword = cryptoJS.SHA256(password).toString();
        if (encryptedPassword === userData.password) {
          this.currentUser = {
            userType: "seller",
            userID: userID,
            username: userData.username,
          };
        } else {
          this.error = "잘못된 비밀번호 입니다.";
          return false;
        }
      } else {
        const teamsQuery = query(collection(database, "Teams"));
        const teams = await getDocs(teamsQuery);
        let documentIndex = -1;
        for (let i = 0; i < teams.docs.length; i++) {
          // 팀 아이디 목록과 대조
          if (userID === teams.docs[i].id) {
            documentIndex = i;
            break;
          }
        }
        if (documentIndex === -1) {
          this.error = "존재하지 않는 부스 아이디입니다.";
          return false;
        }
        const userData = teams.docs[documentIndex].data();
        if (cryptoJS.SHA256(password).toString() === userData.password) {
          this.currentUser = {
            userType: userType,
            userID: userID,
            username: userData.username,
          };
        } else {
          this.error = "잘못된 비밀번호 입니다.";
          return false;
        }
      }
    }
    await setCookie("login_info", this.currentUser); // cookie 설정
    return true;
  },

  async changePassword(userID, currentPassword, newPassword) {
    let userDoc;
    let userType;
    let userData;

    // Check if the userID is digits only
    if (/^\d+$/.test(userID)) {
      // Buyer
      userDoc = await getDoc(doc(database, "Students", userID));
      userData = userDoc.data();
      userType = "buyer";
    } else {
      // Booth login
      if (!userID.includes("@")) {
        this.error = "부적절한 아이디입니다.";
        return false;
      }
      userType = userID.substring(userID.indexOf("@") + 1, userID.length); // @ 뒤의 userType를 그대로 잘라내기
      userID = userID.substring(0, userID.indexOf("@")); // @ 이전의 id를 저장

      if (userType !== "CPU" && userType !== "kiosk" && userType !== "seller") {
        this.error = "부적절한 아이디입니다.";
        return false;
      }

      if (userType === "seller") {
        userDoc = await getDoc(doc(database, "Students", userID));
        userData = userDoc.data();
      } else {
        userDoc = await getDoc(doc(database, "Teams", userID));
        userData = userDoc.data();
      }
    }

    if (!userData) {
      this.error = "존재하지 않는 사용자 아이디입니다.";
      return false;
    }

    const encryptedCurrentPassword = cryptoJS
      .SHA256(currentPassword)
      .toString();

    if (encryptedCurrentPassword !== userData.password) {
      this.error = "현재 비밀번호가 올바르지 않습니다.";
      return false;
    }

    const encryptedNewPassword = cryptoJS.SHA256(newPassword).toString();
    await setDoc(userDoc.ref, { ...userData, password: encryptedNewPassword });

    return true;
  },
};

auth.syncWithStoredLoginInfo(); // 첫 로딩 때 sync하고 시작

export { auth };
