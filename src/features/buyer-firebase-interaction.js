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

// 실시간으로 바꾸기!!!!!

const buyerFirebase = {
  userDocRef: undefined, // 해당하는 document reference
  userDoc: undefined, // 해당하는 document **중요** 자동으로 업데이트되지 않음
  userDocData: undefined, // 위의 userDoc.data()를 실행한 결과
  orderHistory: undefined,
  async init() {
    this.userDocRef = doc(database, "Students", auth.currentUser.userID);
    this.userDoc = await getDoc(this.userDocRef);
    this.userDocData = this.userDoc.data();
    this.orderHistory = JSON.parse(this.userDocData.order_history);
  },
  async submitKioskAuthenticationNumber(submitNumber) {
    const teams = await getDocs(query(collection(database, "Teams")));
    let foundMatch = false;
    for (let i = 0; i < teams.docs.length; i++) {
      // 부스 목록의 kiosk authentication number 비교
      const document = teams.docs[i].data();
      if (submitNumber === document.kiosk_authentication_number) {
        foundMatch = true;
        document.linked_buyer = this.userDoc.id;
        await setDoc(doc(database, "Teams", teams.docs[i].id), document);
        break;
      }
    }
    return foundMatch; // 대조 결과 존재할 시 true 반환 그 외 false 반환
  },
};
export { buyerFirebase };
