// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Firestore DB
import { getAuth } from "firebase/auth";            // Optional: Auth

const firebaseConfig = {
  apiKey: "AIzaSyBhOOScQOhZrw6wdM42sKMU3SRbdxsb8Cc",
  authDomain: "expensetracker-eec5d.firebaseapp.com",
  projectId: "expensetracker-eec5d",
  storageBucket: "expensetracker-eec5d.firebasestorage.app",
  messagingSenderId: "448898692605",
  appId: "1:448898692605:web:35f3ff7e8800a10f99d594"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);  // Firestore database
export const auth = getAuth(app);     // Authentication (optional)
