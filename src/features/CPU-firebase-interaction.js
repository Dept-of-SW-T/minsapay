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
  // 팀과 firebase의 소통을 할 때 쓰는 객체
  userDocRef: undefined, // 해당하는 document reference
  userDoc: undefined, // 해당하는 document **중요** 자동으로 업데이트되지 않음
  userDocData: undefined, // 위의 userDoc.data()를 실행한 결과
  kioskImageDownloadUrl: undefined, // kiosk cover, kiosk home, CPU home에 들어갈 사진을 다운 받을 수 있는 실제 링크 저장장
  menuList: undefined, // 팀의 메뉴 목록(객체)
  orderHistory: undefined,
  async init() {
    this.userDocRef = doc(database, "Teams", auth.currentUser.userID);
    this.userDoc = await getDoc(this.userDocRef);
    this.userDocData = await this.userDoc.data();
    this.menuList = JSON.parse(this.userDocData.menu_list); // firestore에는 stringify된 형태이므로 JSON.parse() 해줘야 함
    this.orderHistory = JSON.parse(this.userDocData.order_history);
  },
  async kioskImageInit() {
    this.kioskImageDownloadUrl = await getDownloadURL(
      // userDocData의 kiosk_image는 이미지가 저장된 reference이고 이를 바탕으로 실제 url을 받아야 함
      ref(storage, this.userDocData.kiosk_image),
    );
  },
  async changeKioskImage(file) {
    // kiosk image 바꾸기
    await deleteObject(ref(storage, this.userDocData.kiosk_image)); // 기존 이미지 storage에서 삭제
    const locationRef = ref(
      storage,
      `${auth.currentUser.userID}/kiosk_image/${file.name}`,
    );
    const result = await uploadBytes(locationRef, file); // storage에 새로운 이미지 업로드
    this.kioskImageDownloadUrl = await getDownloadURL(result.ref);
    this.userDocData.kiosk_image = result.ref._location.path_; // userDoc에 다시 저장 reference 저장
    await setDoc(this.userDocRef, this.userDocData); // document update
    this.userDoc = await getDoc(this.userDocRef);
  },
  async deleteMenuImage(index) {
    // 해당 team의 index번째 menuimage가 있는 경우에 storage에서 삭제
    if (this.menuList[index].imagePath !== "")
      await deleteObject(ref(storage, this.menuList[index].imagePath));
  },
  async uploadMenuImage(index, file) {
    // 메뉴 이미지 업로드드
    if (file !== undefined) {
      // file이 정의되어 있으면
      await this.deleteMenuImage(index); // 기존의 menu image 삭제
      const locationRef = ref(
        storage,
        `${auth.currentUser.userID}/menu_images/${this.menuList[index].id}.${file.name.split(".").pop()}`,
      );
      const result = await uploadBytes(locationRef, file); // 새로 이미지 업로드 후 다시 초기화
      this.menuList[index].imageDownloadUrl = await getDownloadURL(result.ref);
      this.menuList[index].imagePath = result.ref._location.path_;
    }
  },
  async updateFirebaseMenuList() {
    // firestore에 현재 runtime의 메뉴리스트 stringify해서 저장
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
        for (let i = 0; i < buyerOrderHistory.length; i++) {
          if (buyerOrderHistory[i].order_id === orderID) {
            buyerOrderHistory[i].current_state = "환불완료";
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
