import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHgvueYvbSOYy_2BXUQEdC4TKRgK1xcNU",
  authDomain: "rentomation-fbc70.firebaseapp.com",
  projectId: "rentomation-fbc70",
  storageBucket: "rentomation-fbc70.firebasestorage.app",
  messagingSenderId: "219351688032",
  appId: "1:219351688032:web:a61c8abfd54da7bc75b405",
  measurementId: "G-RHCPMMYZ5N",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
