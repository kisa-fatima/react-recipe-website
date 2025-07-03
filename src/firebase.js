// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkqiwPAV6JU3-w9FHgqaHxYCZhzii8-KM",
  authDomain: "react-recipe-website-be649.firebaseapp.com",
  projectId: "react-recipe-website-be649",
  storageBucket: "react-recipe-website-be649.firebasestorage.app",
  messagingSenderId: "878979479239",
  appId: "1:878979479239:web:1ae54b9a62d4ad65a5b0e2",
  measurementId: "G-XCYHP320G7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);