import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCU16rjAOYr4bH_M8e_b5N66dGf8_-v7yE",
  authDomain: "eventsbanner.firebaseapp.com",
  projectId: "eventsbanner",
  storageBucket: "eventsbanner.appspot.com",
  messagingSenderId: "137511681270",
  appId: "1:137511681270:web:f4a231c9adaca30b5ac0d7"
};

const app = initializeApp(firebaseConfig);
export  const imageDb = getFirestore(app);