// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbuFsubynkMIUJ6XfLREyMdFkROQiwKbQ",
  authDomain: "signup-login-user-ce0e8.firebaseapp.com",
  projectId: "signup-login-user-ce0e8",
  storageBucket: "signup-login-user-ce0e8.firebasestorage.app",
  messagingSenderId: "525803516527",
  appId: "1:525803516527:web:36a8185bf9eb5bb1a3539a",
  measurementId: "G-1F6M8VGZ4C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);


export default app;
