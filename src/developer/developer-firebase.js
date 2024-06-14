import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase";

const developerFirebase = {
  collectionNameList: undefined,
  snapshotList: [],
  data: {},
  async init() {
    this.snapshotList = [];
    this.data = {};
    this.collectionNameList = ["Students", "Teams"];
    for (const val of this.collectionNameList) {
      const snapshot = await getDocs(collection(database, val));
      this.snapshotList.push(snapshot);
    }
    this.snapshotList.forEach((val, index) => {
      const collectionName = this.collectionNameList[index];
      this.data[collectionName] = val.docs.map((doc) => doc.data());
    });
  },
};

export { developerFirebase };
