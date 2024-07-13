import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { database } from "../firebase";
import { loginUtils } from "./login-feature";
import { logger } from "./log-feature";

const kioskFirebase = {
  userDocRef: undefined, // 해당하는 document reference
  userDoc: undefined, // 해당하는 document **중요** 자동으로 업데이트되지 않음
  userDocData: undefined, // 위의 userDoc.data()를 실행한 결과
  async init() {
    this.userDocRef = doc(database, "Teams", loginUtils.getUserID());
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
          order_id:
            val.id +
            "?" +
            this.userDoc.id +
            "/" +
            String(index) +
            "@" +
            String(i) +
            "$" +
            String(time.getTime()),
          menu_name: val.menuName,
          reception_time: receptionTime,
          current_state: "주문요청",
          refund_request: 0,
          price: val.price,
        });
        studentOrderHistory.push({
          order_processor: null,
          order_id:
            val.id +
            "?" +
            this.userDoc.id +
            "/" +
            String(index) +
            "@" +
            String(i) +
            "$" +
            String(time.getTime()),
          menu_name: val.menuName,
          price: val.price,
          current_state: "주문요청",
          refund_request: 0,
          team_name: this.userDocData.username,
          team_id: this.userDoc.id,
        });
      }
    });
    this.userDocData.order_history = JSON.stringify(teamOrderHistory);
    this.userDocData.balance += total;
    linkedBuyerDocData.order_history = JSON.stringify(studentOrderHistory);
    linkedBuyerDocData.balance -= total;
    await logger.log({
      type: "transaction",
      sender: linkedBuyerDocData.username,
      reciever: this.userDocData.username,
      amount: total,
    });
    await setDoc(this.userDocRef, this.userDocData);
    const buyerDocRef = doc(
      database,
      "Students",
      this.userDocData.linked_buyer,
    );
    await setDoc(buyerDocRef, linkedBuyerDocData);

    // Check if the transaction was successful
    let checkUserDocData = (await getDoc(this.userDocRef)).data();
    let checkBuyerDocData = (await getDoc(buyerDocRef)).data();

    while (
      checkUserDocData.balance !== checkBuyerDocData.balance ||
      checkUserDocData.order_history !== this.userDocData.order_history ||
      checkBuyerDocData.order_history !== linkedBuyerDocData.order_history
    ) {
      await setDoc(buyerDocRef, linkedBuyerDocData);
      await setDoc(this.userDocRef, this.userDocData);
      checkUserDocData = (await getDoc(this.userDocRef)).data();
      checkBuyerDocData = (await getDoc(buyerDocRef)).data();
    }
  },
};

export { kioskFirebase };
