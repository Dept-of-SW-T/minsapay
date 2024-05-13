import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { database } from "../firebase";

function isStudent(userID) {
    switch(userID[0]) {
        case '0':
            return true;
        case '1':
            return true;
        case '2':
            return true;
        case '3':
            return true;
        case '4':
            return true;
        case '5':
            return true;
        case '6':
            return true;
        case '7':
            return true;
        case '8':
            return true;
        case '9':
            return true;
        default:
            return false;
    }
}

// 해시 함수를 통하여 비밀번호 암호화!!
export const auth = {
    currentUser: null,
    async signIn(userID, password) {
        if(isStudent(userID)) {
            // 학생 로그인
            const studentsQuery = query(
                collection(database, "Students")
            );
            const students = await getDocs(studentsQuery);
            console.log(students.docs[0].data());
        } 
        else {
            // 부스 로그인
            console.log("I am team");

        }
    },
}

/* 
const doc = await addDoc(collection(db, "tweets"), {
  tweet,
  createdAt: Date.now(),
  username: user.displayName || "Anonymous",
  userId: user.uid,
});
await updateDoc(doc, {
  photo: url,
});
const fetchTweets = async () => {
    const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(tweetsQuery);
    const tweets = snapshot.docs.map((doc) => {
        const {tweet, createdAt, userId, username, photo} = doc.data();
        return {
            tweet, createdAt, userId, username, photo,
            id: doc.id,
        }
    }); */