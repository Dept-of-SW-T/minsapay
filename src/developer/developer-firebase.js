import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { database, storage } from "../firebase";
import cryptoJS from "crypto-js";
import { deleteObject, ref, uploadBytes } from "firebase/storage";

const developerFirebase = {
  collectionNameList: undefined,
  snapshotList: [],
  data: {},
  subData: {},
  subDataKeys: [],
  randomPassword() {
    return cryptoJS.SHA256(String(Math.random)).toString().substring(0, 6);
  },
  emptyUser(collectionName) {
    const rpw = this.randomPassword();
    if (collectionName === "Students")
      return {
        username: "",
        password: rpw,
        password_unhashed: cryptoJS.SHA256(rpw).toString(),
        logged_device: "",
        balance: 0,
        order_history: "[]",
        team_list: [],
      };
    else
      return {
        username: "",
        password: rpw,
        password_unhashed: cryptoJS.SHA256(rpw).toString(),
        logged_device: "",
        logged_kiosk_device: "",
        balance: 0,
        kiosk_authentication_number: "",
        kiosk_image: "",
        linked_buyer: "",
        menu_list: "[]",
        student_list: [],
        order_history: "[]",
      };
  },
  async init() {
    this.snapshotList = [];
    this.data = {};
    this.collectionNameList = ["Students", "Teams"];
    this.subDataKeys = ["user_id", "username", "password_unhashed", "balance"];
    for (const val of this.collectionNameList) {
      const snapshot = await getDocs(collection(database, val));
      this.snapshotList.push(snapshot);
    }
    this.snapshotList.forEach((val, index) => {
      const collectionName = this.collectionNameList[index];
      this.data[collectionName] = {};
      val.docs.forEach(
        (doc) => (this.data[collectionName][doc.id] = doc.data()),
      );
    });
    let result = {};
    this.collectionNameList.forEach((collectionName) => {
      result[collectionName] = [];
      for (const userId of Object.keys(this.data[collectionName])) {
        let tmp = {};
        this.subDataKeys.forEach((subDataKey) => {
          if (subDataKey === "user_id") tmp[subDataKey] = userId;
          else tmp[subDataKey] = this.data[collectionName][userId][subDataKey];
        });
        result[collectionName].push(tmp);
      }
    });
    this.subData = result;
  },
  async writeDataToFirebase(data) {
    /*Teams Storage Change*/
    for (const teamUser of Object.keys(this.data["Teams"])) {
      if (!(teamUser in data["Teams"])) {
        // remove all files
        await deleteObject(ref(storage, this.data.Teams[teamUser].kiosk_image));
        const menuList = JSON.parse(this.data.Teams[teamUser].menu_list);
        menuList.forEach(async (menu) => {
          await deleteObject(ref(storage, menu.imagePath));
        });
      }
    }
    for (const teamUser of Object.keys(data["Teams"])) {
      // adding or updating storage
      if (!(teamUser in this.data["Teams"])) {
        // if this team does not exist yet
        const locationRef = ref(
          storage,
          `${teamUser}/kiosk_image/default_kiosk.jpg`,
        );
        const result = await uploadBytes(
          locationRef,
          new File([""], "filename"),
        );
        data.Teams[teamUser].kiosk_image = result.ref._location.path_;
      }
    }
    /**********************/
    this.collectionNameList.forEach(async (collectionName) => {
      const collectionRef = collection(database, collectionName);
      const snapshot = await getDocs(collectionRef);
      snapshot.docs.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      for (const userId of Object.keys(data[collectionName])) {
        await setDoc(
          doc(database, collectionName, userId),
          data[collectionName][userId],
        );
      }
    });
    // need storage management
    await this.init();
  },
};

export { developerFirebase };
