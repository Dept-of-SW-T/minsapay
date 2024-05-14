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
/*
    currentUser: {
        userType --> one of "buyer", "seller", "CPU", "kiosk"
        
    }
*/
export const auth = {
  currentUser: null, // 로그인 되어 있을 때에는 객체이고 로그아웃되어 있을 때에는 null이다.
  error: "",
  isLoggedIn() {
    return this.currentUser !== null;
  }, // 로그인되어 있는지 확인
  async signIn(userID, password) {
    auth.error = "";
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
        this.error = "아이디가 존재하지 않습니다.";
        return;
      }
      const userData = students.docs[documentIndex].data();
      if (cryptoJS.SHA256(password).toString() === userData.password) {
        // 학생 비번 대조
        currentUser = {};
        // Buyer로 로그인

        console.log("Logged in as buyer");
      } else {
        const teamsQuery = query(collection(database, "Teams"));
        const teams = await getDocs(teamsQuery);
        const encryptedPassword = cryptoJS.SHA256(password).toString();
        documentIndex = -1;
        for (let i = 0; i < teams.docs.length; i++) {
          // 부스 비번 대조
          if (encryptedPassword === teams.docs[i].data().password) {
            documentIndex = i;

            // Seller로 로그인
            console.log("Logged in as seller");

            break;
          }
        }
        if (documentIndex === -1) {
          this.error = "비밀번호를 잘못 입력하셨습니다.";
          return;
        }
      }
    } else {
      // 부스 로그인
      console.log("I am team");
    }
    if (documentIndex === -1) {
      this.error = "비밀번호를 잘못 입력하셨습니다.";
      return;
    }
  },
};
/* 
const doc = await addDoc(collection(db, "tweets"), {
  tweet,
  createdAt: Date.now(),
  username: user.displayName || "Anonymous",
  userId: user.uid,
});
await updateDoc(doc, {
  photo: url,
});
const fetchTweets = async () => {
    const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(tweetsQuery);
    const tweets = snapshot.docs.map((doc) => {
        const {tweet, createdAt, userId, username, photo} = doc.data();
        return {
            tweet, createdAt, userId, username, photo,
            id: doc.id,
        }
    }); */
