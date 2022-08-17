import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyBZIr2Yogr0zRcHISIK2irAPHSvHaWGEFw",
  authDomain: "a-ogullari-chat.firebaseapp.com",
  projectId: "a-ogullari-chat",
  storageBucket: "a-ogullari-chat.appspot.com",
  messagingSenderId: "578671280771",
  appId: "1:578671280771:web:dfadf4fbbb57388dc011b6",
});

export const db = getFirestore(app);
