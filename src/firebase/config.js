// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbESiLEAfetcSBQN2xqpJMxCZv0aFrZ-Y",
    authDomain: "react-curso-b6ee6.firebaseapp.com",
    projectId: "react-curso-b6ee6",
    storageBucket: "react-curso-b6ee6.appspot.com",
    messagingSenderId: "407253253431",
    appId: "1:407253253431:web:003f138fa54b0b62186eb2"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);