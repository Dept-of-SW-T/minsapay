import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
/* import { getMessaging } from "firebase/messaging"; */
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVstIqjEOq3xYlom7sMy4QQo157mjwvb4",
  authDomain: "minsapay.firebaseapp.com",
  projectId: "minsapay",
  storageBucket: "minsapay.appspot.com",
  messagingSenderId: "776396681088",
  appId: "1:776396681088:web:ff6eaa5cc690170e07db65",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
export const authentication = getAuth(app);
/* const messaging = getMessaging(app); */

setPersistence(authentication, browserSessionPersistence).then(() => {});

/* messaging.onMessage(async (payload) => {
  console.log("Message received. ", payload);
  if (payload.data.type === "logout") {
    await authentication.signOut();
    alert(
      "You have been logged out because you logged in from another device.",
    );
  }
}); */
