// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz2I46VFNS5ZqV_sTxD8tn-9BikXnvDqc",
  authDomain: "myproject-69b5b.firebaseapp.com",
  projectId: "myproject-69b5b",
  storageBucket: "myproject-69b5b.firebasestorage.app",
  messagingSenderId: "191674769370",
  appId: "1:191674769370:web:28efd06e1de3565b962ae3",
  measurementId: "G-P425J2QCWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app)

export { app, database }