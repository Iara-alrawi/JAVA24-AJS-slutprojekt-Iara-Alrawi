// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAGrzh3Vl7xOuJvQV8mDdWW6_cZhavMkb4",
  authDomain: "todolistapp-fecd1.firebaseapp.com",
  databaseURL: "https://todolistapp-fecd1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todolistapp-fecd1",
  storageBucket: "todolistapp-fecd1.appspot.com",
  messagingSenderId: "99319955346",
  appId: "1:99319955346:web:21ccb87bde2d43c3344b4b",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };
