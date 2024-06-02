import {
  collection,
  /*   doc,
  getDoc, */
  getDocs,
  /*orderBy,*/ query,
} from "firebase/firestore";
import { database } from "../firebase";
import cryptoJS from "crypto-js";
import { getCookie, removeCookie, setCookie } from "./cookies";

/*  1. student id 제외하고는 숫자로 시작하면 안된다
    2. team id는 @ 기호를 포함하면 안된다.  -> kwagibu@kiosk
    student id = start with number, kiosk id = team id  + @kiosk, CPU id = team id + @CPU
    currentUser: {
        userType --> one of "buyer", "seller", "CPU", "kiosk" // 앞으로 admin(금정), kwagibu(시스템 관리자) 추가하면 좋을 듯
        userID
        username
        { : only when userType === "seller"
            linkedTeamID
            linkedTeamName
        }
    }
*/

const auth = {
  currentUser: null, // 로그인 되어 있을 때에는 객체이고 로그아웃되어 있을 때에는 null이다.
  error: "", // auth 함수 처리 과정중의 모든 error들을 다 가져온다 --> if(auth.함수) { 에러 처리 코드 } // error를 초기화하고 함수를 돌리거나 함수 자체로 true false를 return하도록
  syncWithStoredLoginInfo() {
    // cookie에 저장된 loginInfo와 동기화 --> 새로고침되었을 때의 상황에서도 cookie를 이용하여 다시 로컬 객체를 동기화시키는 역할
    const loginInfo = getCookie("login_info");
    if (loginInfo !== undefined) {
      // 이미 로그인된 경우
      this.currentUser = loginInfo;
    }
  },
  signOut() {
    this.currentUser = null;
    this.error = ""; // auth 객체 초기화
    removeCookie("login_info"); // 로그아웃 시 cookie 삭제
  },
  async signIn(userID, password) {
    // 성공적인 로그인 시 true를 그게 아닐 시 false를 return한다.
    function isStudent(userID) {
      return /\d/.test(userID[0]); // 숫자로 시작하는 아이디 = 학생 아이디 --> 학생이면 true return
    }
    await this.signOut();
    if (isStudent(userID)) {
      // 학생 아이디가 맞다면
      const studentsQuery = query(collection(database, "Students"));
      const students = await getDocs(studentsQuery);
      let documentIndex = -1;
      for (let i = 0; i < students.docs.length; i++) {
        // 학생 firestore의 학생 아이디 목록과 대조
        if (userID === students.docs[i].id) {
          documentIndex = i;
          break;
        }
      }
      if (documentIndex === -1) {
        // 맞는 결과가 없으면 error 설정 후 false return
        this.error = "존재한지 않는 사용자 아이디입니다.";
        return false;
      }
      const userData = students.docs[documentIndex].data();
      const encryptedPassword = cryptoJS.SHA256(password).toString();
      if (encryptedPassword === userData.password) {
        // 입력 비밀번호와 저장된 비밀번호 해시 비교
        this.currentUser = {
          userType: "buyer",
          userID: userID,
          username: userData.username,
        };
        // Buyer로 로그인
      } else {
        // 학생 비번과 불일치하면
        const encryptedPassword = cryptoJS.SHA256(password).toString();
        const teamsQuery = query(collection(database, "Teams"));
        const teams = await getDocs(teamsQuery);
        documentIndex = -1;
        for (let i = 0; i < teams.docs.length; i++) {
          // 부스 목록의 비번 해시 대조
          const doc = teams.docs[i].data();
          if (encryptedPassword === doc.password) {
            documentIndex = i;
            this.currentUser = {
              userType: "seller",
              userID: userID,
              username: userData.username,
              linkedTeamID: teams.docs[i].id,
              linkedTeamName: doc.username,
            };
            // Seller로 로그인
            break;
          }
        }
        if (documentIndex === -1) {
          // 팀 비밀번호와의 대조도 했는데 결과가 없으면 잘못된 비밀번호 입력이므로 error return
          this.error = "잘못된 비밀번호입니다.";
          return false;
        }
      }
    } else {
      // 부스 로그인
      if (!userID.includes("@")) {
        // 아이디 입력에 @가 없으면 error return
        this.error = "부적절한 부스 아이디입니다.";
        return false;
      }
      const userType = userID.substring(userID.indexOf("@") + 1, userID.length); // @ 뒤의 usertype를 그대로 잘라내기
      if (userType !== "CPU" && userType !== "kiosk") {
        this.error = "부적절한 부스 아이디입니다.";
        return false;
      }
      userID = userID.substring(0, userID.indexOf("@")); // @ 이전의 id를 저장
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
        // 대조 결과가 없으면 error return
        this.error = "존재하지 않는 부스 아이디입니다.";
        return false;
      }
      const userData = teams.docs[documentIndex].data();
      if (cryptoJS.SHA256(password).toString() === userData.password) {
        this.currentUser = {
          userType: userType,
          userID: userID,
          username: userData.username,
          // 전에 저장한 userType로 로그인
        };
      } else {
        // 비밀번호 대조결과가 없는 경우
        this.error = "잘못된 비밀번호 입니다.";
        return false;
      }
    }
    setCookie("login_info", this.currentUser); // cookie 설정
    return true;
  },
};
auth.syncWithStoredLoginInfo(); // 첫 로딩 때 sync하고 시작  // 이거 다른 데에 다 넣을까 생각중

export { auth };
