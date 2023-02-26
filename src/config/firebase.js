// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore' 
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZVd5pGMiut9HjZL--ZVXRXPb4UUVj_1o",
  authDomain: "pt-firebase-course.firebaseapp.com",
  projectId: "pt-firebase-course",
  storageBucket: "pt-firebase-course.appspot.com",
  messagingSenderId: "1087252613771",
  appId: "1:1087252613771:web:d9d05ae24f6fe9bd79e28e",
  measurementId: "G-M0MQ3LF2RW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)

export const storage = getStorage(app)