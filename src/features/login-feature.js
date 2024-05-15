import { collection, getDocs, /*orderBy,*/ query } from "firebase/firestore";
import { database } from "../firebase";
import cryptoJS from "crypto-js";

function isStudent(userID) {
  switch (userID[0]) {
    case "0":
      return true;
    case "1":
      return true;
    case "2":
      return true;
    case "3":
      return true;
    case "4":
      return true;
    case "5":
      return true;
    case "6":
      return true;
    case "7":
      return true;
    case "8":
      return true;
    case "9":
      return true;
    default:
      return false;
  }
}
/*  1. student id 제외하고는 숫자로 시작하면 안된다
    2. team username은 @ 기호를 포함하면 안된다.  -> kwagibu@kiosk
    student id = start with number, kiosk id = cpu id  + @kiosk
    currentUser: {
        userType --> one of "buyer", "seller", "CPU", "kiosk"
        userID
        username
        { : only when userType === "seller"
            linkedTeamID
            linkedTeamName
        }
    }
*/
export const auth = {
  currentUser: null, // 로그인 되어 있을 때에는 객체이고 로그아웃되어 있을 때에는 null이다.
  error: "",
  async signIn(userID, password) {
    // return true if successful login else false
    this.currentUser = null;
    this.error = "";
    if (isStudent(userID)) {
      // 학생 로그인
      const studentsQuery = query(collection(database, "Students"));
      const students = await getDocs(studentsQuery);
      let documentIndex = -1;
      for (let i = 0; i < students.docs.length; i++) {
        // 학생 아이디 대조
        if (userID === students.docs[i].id) {
          documentIndex = i;
          break;
        }
      }
      if (documentIndex === -1) {
        this.error = "존재한지 않는 사용자 아이디입니다.";
        return false;
      }
      const userData = students.docs[documentIndex].data();
      if (cryptoJS.SHA256(password).toString() === userData.password) {
        // 학생 비번 대조
        this.currentUser = {
          userType: "buyer",
          userID: userID,
          username: userData.username,
        };
        // Buyer로 로그인
      } else {
        const teamsQuery = query(collection(database, "Teams"));
        const teams = await getDocs(teamsQuery);
        const encryptedPassword = cryptoJS.SHA256(password).toString();
        documentIndex = -1;
        for (let i = 0; i < teams.docs.length; i++) {
          // 부스 비번 대조
          const doc = teams.docs[i].data();
          if (encryptedPassword === doc.password) {
            documentIndex = i;
            this.currentUser = {
              userType: "seller",
              userID: userID,
              username: userData.username,
              linkedTeamID: teams.docs[i].id,
              linkedTeamName: doc.username, // --> 상의 후 결정
            };
            // Seller로 로그인
            break;
          }
        }
        if (documentIndex === -1) {
          this.error = "잘못된 비밀번호입니다.";
          return false;
        }
      }
    } else {
      // 부스 로그인
      if (!userID.includes("@")) {
        this.error = "부적절한 부스 아이디입니다.";
        return false;
      }
      const userType = userID.substring(userID.indexOf("@") + 1, userID.length);
      if (userType !== "CPU" && userType !== "kiosk") {
        this.error = "부적절한 부스 아이디입니다.";
        return false;
      }
      userID = userID.substring(0, userID.indexOf("@"));
      const teamsQuery = query(collection(database, "Teams"));
      const teams = await getDocs(teamsQuery);
      let documentIndex = -1;
      for (let i = 0; i < teams.docs.length; i++) {
        // 학생 아이디 대조
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
    return true;
  },
};
