import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAkL6hkLjW_I9_4HTM8RUTcmFZhYhbo1ac",
  authDomain: "tonbo-demo.firebaseapp.com",
  databaseURL: "https://tonbo-demo-default-rtdb.firebaseio.com",
  projectId: "tonbo-demo",
  storageBucket: "tonbo-demo.appspot.com",
  messagingSenderId: "687520212264",
  appId: "1:687520212264:web:017e7f69f1caca553f9c1d",
  measurementId: "G-S2B5D88L7T",
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { auth, db, database };
