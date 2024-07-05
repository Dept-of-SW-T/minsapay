import { database } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const moderatorFirebase = {
  // usersQuery: undefined,
  // teamsQuery: undefined,
  // teamsList: [],
  usersCollectionRef: undefined,
  usersList: [],

  async init() {
    //   // this.teamsQuery = query(
    //     //   collection(database, "Teams"),
    //     //   orderBy("__name__", "asc"),
    //     // );
    //     // await onSnapshot(this.teamsQuery, (snapshot) => {
    //       //   this.teamsList = [];
    //       //   snapshot.docs.forEach((doc) => this.teamsList.push(doc.data()));
    //       // });
    //   this.usersList = await getDocs(this.usersCollectionRef).map((doc) => {this.usersList.push(doc.data())});
    //   console.log(this.usersList);
    //   // this.usersQuery = query(
    //   //   this.usersCollectionRef,
    //   //   orderBy("__name__", "asc"),
    //   // );
    //   // await onSnapshot(this.usersQuery, (snapshot) => {
    //   //   this.usersList = [];
    //   //   snapshot.docs.forEach((doc) => this.usersList.push(doc.data()));
    //   // });
    // },
    this.usersCollectionRef = collection(database, "Students");
    const usersSnapshot = await getDocs(this.usersCollectionRef);
    usersSnapshot.forEach((user) => this.usersList.push(user.data()));
  },
};

export { moderatorFirebase };
