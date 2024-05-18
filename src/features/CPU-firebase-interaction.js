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
  async init() {
    this.userDocRef = doc(database, "Teams", auth.currentUser.userID);
    this.userDoc = await getDoc(this.userDocRef);
    this.userDocData = await this.userDoc.data();
    this.menuList = JSON.parse(CPUFirebase.userDocData.menu_list);
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
  },
  async deleteMenuImage(index) {
    if (this.menuList[index].imagePath !== "")
      await deleteObject(ref(storage, this.menuList[index].imagePath));
  },
  async uploadMenuImage(index, file) {
    if (file !== undefined) {
      await this.deleteMenuImage(index);
      const locationRef = ref(
        storage,
        `${auth.currentUser.userID}/menu_images/${this.menuList[index].id}.${file.name.split(".").pop()}`,
      );
      const result = await uploadBytes(locationRef, file);
      this.menuList[index].imageDownloadUrl = await getDownloadURL(result.ref);
      this.menuList[index].imagePath = result.ref._location.path_;
    }
  },
  async updateFirebaseMenuList() {
    this.userDocData.menu_list = JSON.stringify(this.menuList);
    await setDoc(this.userDocRef, this.userDocData);
  },
};
export { CPUFirebase };
