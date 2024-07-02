import { database } from "../firebase";
import { query, collection, getDocs, orderBy } from "firebase/firestore";

const moderatorFirebase = {
  usersList: [],
  teamsList: [],

  async init() {
    const usersQuery = query(
      collection(database, "Students"),
      orderBy("__name__", "asc"),
    );
    const usersSnapshot = await getDocs(usersQuery);
    usersSnapshot.docs.forEach((doc) => this.usersList.push(doc.data()));

    const teamsQuery = query(
      collection(database, "Teams"),
      orderBy("__name__", "asc"),
    );
    const teamsSnapshot = await getDocs(teamsQuery);
    teamsSnapshot.docs.forEach((doc) => this.teamsList.push(doc.data()));
  },
};

export { moderatorFirebase };
