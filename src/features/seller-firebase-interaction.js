import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../firebase";
import { loginUtils } from "./login-feature";

const sellerFirebase = {
  userDocRef: undefined, // 해당하는 document reference
  userDoc: undefined, // 해당하는 document **중요** 자동으로 업데이트되지 않음
  userDocData: undefined, // 위의 userDoc.data()를 실행한 결과
  teamList: undefined,

  teamDocRef: undefined,
  teamDoc: undefined,
  teamDocData: undefined,
  orderHistory: undefined,
  async init() {
    this.userDocRef = doc(database, "Students", loginUtils.getUserID());
    this.userDoc = await getDoc(this.userDocRef);
    this.userDocData = this.userDoc.data();
    this.teamList = this.userDocData.team_list;
  },
  async getTeamData(id) {
    this.teamDocRef = doc(database, "Teams", id);
    this.teamDoc = await getDoc(this.teamDocRef);
    this.teamDocData = this.teamDoc.data();
    this.orderHistory = JSON.parse(this.teamDocData.order_history);
  },
  async setStatus(id, status) {
    console.log(id, status);
    for (let i = 0; i < this.orderHistory.length; i++) {
      if (this.orderHistory[i].order_id === id) {
        this.orderHistory[i].current_state = status;
        this.teamDocData.order_history = JSON.stringify(this.orderHistory);
        await setDoc(this.teamDocRef, this.teamDocData);

        console.log(this.orderHistory[i]);
        const buyerDocRef = doc(
          database,
          "Students",
          this.orderHistory[i].buyer_id,
        );
        const buyerDoc = await getDoc(buyerDocRef);
        const buyerDocData = buyerDoc.data();
        const buyerOrderHistory = JSON.parse(buyerDocData.order_history);
        for (let j = 0; j < buyerOrderHistory.length; j++) {
          if (buyerOrderHistory[j].order_id === id) {
            buyerOrderHistory[j].current_state = status;
            buyerDocData.order_history = JSON.stringify(buyerOrderHistory);
            await setDoc(buyerDocRef, buyerDocData);
            break;
          }
        }
        console.log("uploaded changed status to firebase");
        break;
      }
    }
    console.log("end of function");
  },
};

export { sellerFirebase };
