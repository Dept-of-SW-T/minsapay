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
  kiosk_image_download_url: undefined,
  async init() {
    this.userDocRef = doc(database, "Teams", auth.currentUser.userID);
    this.userDoc = await getDoc(this.userDocRef);
    this.userDocData = this.userDoc.data();
    this.kiosk_image_download_url = await getDownloadURL(
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
    this.kiosk_image_download_url = await getDownloadURL(result.ref);
    this.userDocData.kiosk_image = result.ref._location.path_;
    await setDoc(this.userDocRef, this.userDocData);
  },
};

export { CPUFirebase };
