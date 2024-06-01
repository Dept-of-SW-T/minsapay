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
  async syncDoc() {
    this.userDoc = await getDoc(this.userDocRef);
    this.userDocData = this.userDoc.data();
  },
  async removeLinkedBuyer() {
    // only used at end of kiosk home for destruction
    this.userDocData.linked_buyer = "";
    await setDoc(this.userDocRef, this.userDocData);
  },
  async submitOrders(orders, total) {
    const time = new Date();
    const receptionTime = `${String(time.getHours()).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}:${String(time.getSeconds()).padStart(2, "0")}`;
    let teamOrderHistory = JSON.parse(this.userDocData.order_history);
    const linkedBuyerDoc = await getDoc(
      doc(database, "Students", this.userDocData.linked_buyer),
    );
    const linkedBuyerDocData = linkedBuyerDoc.data();
    let studentOrderHistory = JSON.parse(linkedBuyerDocData.order_history);
    orders.forEach((val, index) => {
      for (let i = 0; i < val.quantity; i++) {
        teamOrderHistory.push({
          order_processor: null,
          buyer_id: this.userDocData.linked_buyer,
          buyer_name: linkedBuyerDocData.username,
          menu_id: val.id + "?" + this.userDoc.id + "/" + String(index),
          menu_name: val.menuName,
          reception_time: receptionTime,
          current_state: "주문요청",
        });
        studentOrderHistory.push({
          order_processor: null,
          menu_id: val.id + "?" + this.userDoc.id + "/" + String(index),
          menu_name: val.menuName,
          price: val.price,
          current_state: "주문요청",
          team_name: this.userDocData.username,
          team_id: this.userDoc.id,
        });
      }
    });
    this.userDocData.order_history = JSON.stringify(teamOrderHistory);
    this.userDocData.balance += total;
    linkedBuyerDocData.order_history = JSON.stringify(studentOrderHistory);
    linkedBuyerDocData.balance -= total;
    await setDoc(this.userDocRef, this.userDocData);
    await setDoc(
      doc(database, "Students", this.userDocData.linked_buyer),
      linkedBuyerDocData,
    );
  },
};

export { kioskFirebase };
