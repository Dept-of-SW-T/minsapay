import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { database } from "../firebase";
import { auth } from "./login-feature";

const kioskFirebase = {
  userDocRef: undefined, // 해당하는 document reference
  userDoc: undefined, // 해당하는 document **중요** 자동으로 업데이트되지 않음
  userDocData: undefined, // 위의 userDoc.data()를 실행한 결과
  orderHistory: undefined,
  async init() {
    this.userDocRef = doc(database, "Teams", auth.currentUser.userID);
    this.userDoc = await getDoc(this.userDocRef);
    this.userDocData = this.userDoc.data();
  },
  async setKioskAuthenticationNumber() {
    const teamDocs = await getDocs(query(collection(database, "Teams")));
    let newKey = undefined;
    let isUnique = false;
    while (!isUnique) {
      isUnique = true;
      newKey = String(Math.floor(Math.random() * 100000)).padStart(5, "0");
      teamDocs.forEach((val) => {
        const data = val.data();
        if (newKey === data.kiosk_authentication_number) {
          isUnique = false;
          return false;
        }
      });
    }
    this.userDocData.kiosk_authentication_number = newKey;
    await setDoc(this.userDocRef, this.userDocData);
    this.userDoc = await getDoc(this.userDocRef);
  },
};

export { kioskFirebase };
