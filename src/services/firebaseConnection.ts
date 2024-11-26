import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0MmQmDpIEziX9wUMyDSzA0nCbEiIFGUo",
  authDomain: "reactlinks-b1aeb.firebaseapp.com",
  projectId: "reactlinks-b1aeb",
  storageBucket: "reactlinks-b1aeb.firebasestorage.app",
  messagingSenderId: "1019677357794",
  appId: "1:1019677357794:web:e2b760b2938c1b1d5710bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db}