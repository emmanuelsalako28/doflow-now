import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxeTiEbDEscPFwb9rj-VC4EIfrdhyuU_g",
  authDomain: "team-dashboard-fa3f9.firebaseapp.com",
  projectId: "team-dashboard-fa3f9",
  storageBucket: "team-dashboard-fa3f9.firebasestorage.app",
  messagingSenderId: "222404986235",
  appId: "1:222404986235:web:01887442dd634acda969de"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
