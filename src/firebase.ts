import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBPQLwLzqMocrzUTG5LMQ9yP0m-p-iJkQ",
  authDomain: "movieapp-88327.firebaseapp.com",
  projectId: "movieapp-88327",
  storageBucket: "movieapp-88327.firebasestorage.app",
  messagingSenderId: "953942431093",
  appId: "1:953942431093:web:916a20917e65c0f639af3c",
  measurementId: "G-P2WBV5FYZZ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);