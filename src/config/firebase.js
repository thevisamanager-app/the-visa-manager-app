import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0QcbuM61VpUwy5rOHXbbcbR7qXfSCogE",
  authDomain: "thevisamanager-bea80.firebaseapp.com",
  projectId: "thevisamanager-bea80",
  storageBucket: "thevisamanager-bea80.firebasestorage.app",
  messagingSenderId: "973458787565",
  appId: "1:973458787565:web:76d2b5c721d9fa447410e4"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
