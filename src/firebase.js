import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// firebase 가져오기
