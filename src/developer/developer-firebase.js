import { collection, getDocs, query } from "firebase/firestore";
import { authentication, database } from "../firebase";
import cryptoJS from "crypto-js";
import { createUserWithEmailAndPassword } from "firebase/auth";

const developerFirebase = {
  userData: {},
  /* 
    {
      Students {
        231133 {
          documentSnapshot : <snapshot>
          documentData : {
            balance: <number>,
            order_history: <string (JSON.stringify(), needs to be parsed for usage)>,
            team_list: <array of team ids>,
            username: <string>,
          }
        }
        ...
      }
      Teams {
        kwagibu {
          documentSnapshot : <snapshot>
          documentData : {
            balance: <number>,
            kiosk_authentication_number: <string of number>,
            kiosk_image: <string of image storage path, given as default of 광어>,
            linked_buyer: <string of buyer id>,
            menu_list: <string (JSON.stringify(), needs to be parsed for usage)>,
            order_history: <string (JSON.stringify(), needs to be parsed for usage)>,
            student_list: <array of student ids>,
            username: <string>,
          }
        }
        ...
      }
    }
  */
  userSubData: {},
  /* 
    {
      Students {
        231133 {
          balance: <number>,
          username: <string>,
          password: <string>
        }
        ...
      }
      Teams {
        kwagibu {
          balance: <number>,
          username: <string>,
          password: <string>
        }
        ...
      }
    }
  */
  randomPassword() {
    return cryptoJS.SHA256(String(Math.random())).toString().substring(0, 6);
  },
  async init() {
    const studentQuery = query(collection(database, "Students"));
    const studentSnapshot = await getDocs(studentQuery);
    this.userData = {
      Students: {},
      Teams: {},
    };
    this.userSubData = {
      Students: {},
      Teams: {},
    };
    studentSnapshot.forEach((doc) => {
      this.userData.Students[doc.id] = {};
      this.userData.Students[doc.id].documentSnapshot = doc;
      this.userData.Students[doc.id].documentData = doc.data();

      this.userSubData.Students[doc.id] = {};
      this.userSubData.Students[doc.id].balance =
        this.userData.Students[doc.id].documentData.balance;
      this.userSubData.Students[doc.id].username =
        this.userData.Students[doc.id].documentData.username;
      this.userSubData.Students[doc.id].password = "";
    });
    const teamQuery = query(collection(database, "Teams"));
    const teamSnapshot = await getDocs(teamQuery);
    teamSnapshot.forEach((doc) => {
      this.userData.Teams[doc.id] = {};
      this.userData.Teams[doc.id].documentSnapshot = doc;
      this.userData.Teams[doc.id].documentData = doc.data();

      this.userSubData.Teams[doc.id] = {};
      this.userSubData.Teams[doc.id].balance =
        this.userData.Teams[doc.id].documentData.balance;
      this.userSubData.Teams[doc.id].username =
        this.userData.Teams[doc.id].documentData.username;
      this.userSubData.Teams[doc.id].password = "";
    });
  },
  standardizeSubData(xldata) {
    let resultData = { Students: {}, Teams: {} };
    xldata.Students.forEach((student) => {
      resultData.Students[student.user_id] = {};
      resultData.Students[student.user_id].balance = student.balance;
      resultData.Students[student.user_id].username =
        typeof student.username === "number"
          ? String(student.username)
          : student.username;
      resultData.Students[student.user_id].password =
        typeof student.password === "number"
          ? String(student.password)
          : student.password;
    });
    xldata.Teams.forEach((team) => {
      resultData.Teams[team.user_id] = {};
      resultData.Teams[team.user_id].balance = team.balance;
      resultData.Teams[team.user_id].username =
        typeof team.username === "number"
          ? String(team.username)
          : team.username;
      resultData.Teams[team.user_id].password =
        typeof team.password === "number"
          ? String(team.password)
          : team.password;
    });
    return resultData;
  },
  async writeDataToFirebase(subData) {
    let resultUserDocumentData = { Students: {}, Teams: {} };
    for (let student in subData.Students) {
      if (student in this.userData.Students) {
        // student already exists
        resultUserDocumentData.Students[student] =
          this.userData.Students[student].documentData;
        if (subData.Students[student].balance !== undefined)
          resultUserDocumentData.Students[student].balance =
            subData.Students[student].balance;
        if (subData.Students[student].username !== undefined)
          resultUserDocumentData.Students[student].username =
            subData.Students[student].username;
        // cannot change password
      } else {
        // student does not already exist
        resultUserDocumentData.Students[student] = {
          balance:
            subData.Students[student].balance === undefined
              ? 0
              : subData.Students[student].balance,
          order_history: "[]",
          team_list: [],
          username:
            subData.Students[student].username === undefined
              ? "no-name"
              : subData.Students[student].username,
        };
        await createUserWithEmailAndPassword(
          authentication,
          `${student}@student.com`,
          subData.Students[student].password,
        );
        // create account for user using `${student}@student.com` & subData.Students[student].password
      }
    }
    for (let team in subData.Teams) {
      if (team in this.userData.Teams) {
        // team already exists
        resultUserDocumentData.Teams[team] =
          this.userData.Teams[team].documentData;
        if (subData.Teams[team].balance !== undefined)
          resultUserDocumentData.Teams[team].balance =
            subData.Teams[team].balance;
        if (subData.Teams[team].username !== undefined)
          resultUserDocumentData.Teams[team].username =
            subData.Teams[team].username;
        // cannot change password
      } else {
        // team does not already exist
        resultUserDocumentData.Teams[team] = {
          balance:
            subData.Teams[team].balance === undefined
              ? 0
              : subData.Teams[team].balance,
          kiosk_authentication_number: "",
          kiosk_image: "defaultBooth/광어.jpg",
          linked_buyer: "",
          menu_list: "[]",
          order_history: "[]",
          student_list: [],
          username:
            subData.Teams[team].username === undefined
              ? "no-name"
              : subData.Teams[team].username,
        };
        await createUserWithEmailAndPassword(
          authentication,
          `${team}@team.com`,
          subData.Teams[team].password,
        );
        // create account for user using `${team}@team.com` & subData.Teams[team].password
      }
    }

    // console.log(resultUserDocumentData);
  },
  async submitStudentData(subData) {
    subData;
  },
  async submitTeamData(subData) {
    subData;
  },
};

export { developerFirebase };
