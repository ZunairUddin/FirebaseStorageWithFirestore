// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  //PASTE UR FIREBASE CONFIG HERE.........
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const STORAGE = getStorage(app);
const DATABASE = getFirestore(app);
const AUTH = getAuth(app);

export { STORAGE, DATABASE, AUTH };
