// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIguRjSjLICXzozMeAphhDrpN6HNHfTrA",
  authDomain: "task-manager-web-83634.firebaseapp.com",
  projectId: "task-manager-web-83634",
  storageBucket: "task-manager-web-83634.firebasestorage.app",
  messagingSenderId: "1084405772020",
  appId: "1:1084405772020:web:6b0e17a88d1348ef77b8a1",
  measurementId: "G-W7HLQCVFD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);