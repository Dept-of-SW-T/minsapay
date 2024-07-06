import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "./login-feature";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { database, storage } from "../firebase";

const CPUFirebase = {
  userDocRef: undefined,
  userDoc: undefined,
  userDocData: undefined,
  kioskImageDownloadUrl: undefined,
  menuList: undefined,
  orderHistory: undefined,
  async init() {
    this.userDocRef = doc(database, "Teams", auth.currentUser.userID);
    this.userDoc = await getDoc(this.userDocRef);
    this.userDocData = this.userDoc.data();
    this.menuList = JSON.parse(this.userDocData.menu_list);
    this.orderHistory = JSON.parse(this.userDocData.order_history);
  },
  async kioskImageInit() {
    this.kioskImageDownloadUrl = await getDownloadURL(
      ref(storage, this.userDocData.kiosk_image),
    );
  },
  async changeKioskImage(file) {
    await deleteObject(ref(storage, this.userDocData.kiosk_image));
    const locationRef = ref(
      storage,
      `${auth.currentUser.userID}/kiosk_image/${file.name}`,
    );
    const result = await uploadBytes(locationRef, file);
    this.kioskImageDownloadUrl = await getDownloadURL(result.ref);
    this.userDocData.kiosk_image = result.ref._location.path_;
    await setDoc(this.userDocRef, this.userDocData);
    this.userDoc = await getDoc(this.userDocRef);
  },
  async deleteMenuImage(index) {
    const menuItem = this.menuList[index];
    if (menuItem && menuItem.imagePath) {
      const imageRef = ref(storage, menuItem.imagePath);
      await deleteObject(imageRef);
    }
  },
  async uploadMenuImage(id, file) {
    const storageRef = ref(storage, `menuImages/${id}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const imageDownloadUrl = await getDownloadURL(snapshot.ref);

    return {
      imageDownloadUrl,
      imagePath: storageRef.fullPath,
    };
  },
  async updateFirebaseMenuList() {
    this.userDocData.menu_list = JSON.stringify(this.menuList);
    await setDoc(this.userDocRef, this.userDocData);
    this.userDoc = await getDoc(this.userDocRef);
  },
  async refundOrder(orderID) {
    let buyerID = undefined;
    for (let i = 0; i < this.orderHistory.length; i++) {
      if (this.orderHistory[i].order_id === orderID) {
        this.orderHistory[i].current_state = "환불완료";
        this.userDocData.order_history = JSON.stringify(this.orderHistory);
        this.userDocData.balance -= this.orderHistory[i].price;
        buyerID = this.orderHistory[i].buyer_id;
        const buyerDocRef = doc(database, "Students", buyerID);
        const buyerDoc = await getDoc(buyerDocRef);
        const buyerDocData = buyerDoc.data();
        const buyerOrderHistory = JSON.parse(buyerDocData.order_history);
        for (let j = 0; j < buyerOrderHistory.length; j++) {
          if (buyerOrderHistory[j].order_id === orderID) {
            buyerOrderHistory[j].current_state = "환불완료";
            buyerDocData.order_history = JSON.stringify(buyerOrderHistory);
            buyerDocData.balance += this.orderHistory[i].price;
            break;
          }
        }
        await setDoc(buyerDocRef, buyerDocData);
        await setDoc(this.userDocRef, this.userDocData);
        break;
      }
    }
  },
};

export { CPUFirebase };
