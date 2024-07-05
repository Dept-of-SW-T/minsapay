import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../firebase";
import cryptoJS from "crypto-js";
import { getCookie } from "./cookies";

const auth = {
  currentUser: null, // 로그인 되어 있을 때에는 객체이고 로그아웃되어 있을 때에는 null이다.
  error: "", // auth 함수 처리 과정중의 모든 error들을 다 가져온다 --> if(auth.함수) { 에러 처리 코드 } // error를 초기화하고 함수를 돌리거나 함수 자체로 true false를 return하도록

  async syncWithStoredLoginInfo() {
    // cookie에 저장된 loginInfo와 동기화 --> 새로고침되었을 때의 상황에서도 cookie를 이용하여 다시 로컬 객체를 동기화시키는 역할
    const loginInfo = await getCookie("login_info");
    this.currentUser = loginInfo;
  },

  async changePassword(currentPassword, newPassword) {
    const userID = this.currentUser.userID;
    const userType = this.currentUser.userType;

    let userDoc;
    if (userType === "buyer" || userType === "seller") {
      userDoc = await getDoc(doc(database, "Students", userID));
    } else {
      userDoc = await getDoc(doc(database, "Teams", userID));
    }

    const userData = userDoc.data();

    const encryptedCurrentPassword = cryptoJS
      .SHA256(currentPassword)
      .toString();
    if (encryptedCurrentPassword !== userData.password) {
      this.error = "현재 비밀번호가 올바르지 않습니다.";
      return false;
    }

    const encryptedNewPassword = cryptoJS.SHA256(newPassword).toString();
    await setDoc(userDoc.ref, {
      ...userData,
      password: encryptedNewPassword,
    });

    return true;
  },
};

auth.syncWithStoredLoginInfo(); // 첫 로딩 때 sync하고 시작

export { auth };
