import { database } from "../firebase";
import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";

const moderatorFirebase = {
  // usersQuery: undefined,
  // teamsQuery: undefined,
  // teamsList: [],
  usersCollectionRef: undefined,
  usersList: [],
  usersIndex: {},
  usersRef: {},

  async init() {
    this.usersCollectionRef = collection(database, "Students");
    const usersSnapshot = await getDocs(this.usersCollectionRef);
    usersSnapshot.forEach((user) => {
      this.usersList.push(user);
      this.usersIndex[user.id] = this.usersList.length - 1;
    });
    for (let i = 0; i < this.usersList.length; i++) {
      this.usersRef[this.usersList[i].id] = doc(
        this.usersCollectionRef,
        this.usersList[i].id,
      );
    }
  },

  async changeBalance(userId, amount) {
    const ref = this.usersRef[userId];
    const curUserData = (await getDoc(ref)).data();
    curUserData.balance += amount;
    await setDoc(ref, curUserData);
  },
};

export { moderatorFirebase };
