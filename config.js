// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp0fFLxw6EMnDGoNoGKRq5cq-_R5-WMnM",
  authDomain: "authentication-dcca0.firebaseapp.com",
  projectId: "authentication-dcca0",
  storageBucket: "authentication-dcca0.appspot.com",
  messagingSenderId: "821989640671",
  appId: "1:821989640671:web:056069850422cc94885c6a",
  measurementId: "G-KH1WM0Z9EH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
