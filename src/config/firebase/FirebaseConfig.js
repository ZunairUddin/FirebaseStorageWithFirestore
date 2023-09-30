// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  //PASTE UR FIREBASE CONFIG HERE.........
  apiKey: "AIzaSyAXoU1Y7daHm4X9GKJ4WzKeEkZncw4cWAg",
  authDomain: "testing-2e13b.firebaseapp.com",
  databaseURL: "https://testing-2e13b-default-rtdb.firebaseio.com",
  projectId: "testing-2e13b",
  storageBucket: "testing-2e13b.appspot.com",
  messagingSenderId: "503385084408",
  appId: "1:503385084408:web:e7a19fbf196530b924460d",
  measurementId: "G-1DF3PWD8HZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const STORAGE = getStorage(app);
const DATABASE = getFirestore(app);
const AUTH = getAuth(app);

export { STORAGE, DATABASE, AUTH };
