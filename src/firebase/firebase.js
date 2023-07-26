import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsdhNhpLJOtF3A6tia9oij2yRGIv0OrRM",
  authDomain: "chat-app-68944.firebaseapp.com",
  projectId: "chat-app-68944",
  storageBucket: "chat-app-68944.appspot.com",
  messagingSenderId: "208693404788",
  appId: "1:208693404788:web:57874a2c8764c2c0345d21",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider, db, database };
