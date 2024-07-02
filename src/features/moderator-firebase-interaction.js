import { database } from "../firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";

const moderatorFirebase = {
  usersList: [],
  teamsList: [],

  async init() {
    const usersQuery = query(
      collection(database, "Students"),
      orderBy("__name__", "asc"),
    );
    await onSnapshot(usersQuery, (snapshot) => {
      this.usersList = [];
      snapshot.docs.forEach((doc) => this.usersList.push(doc.data()));
      console.log(this.usersList);
    });

    const teamsQuery = query(
      collection(database, "Teams"),
      orderBy("__name__", "asc"),
    );
    await onSnapshot(teamsQuery, (snapshot) => {
      this.teamsList = [];
      snapshot.docs.forEach((doc) => this.teamsList.push(doc.data()));
    });
  },
};

export { moderatorFirebase };
