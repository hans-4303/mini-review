// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "use-for-green-mini-project.firebaseapp.com",
  projectId: "use-for-green-mini-project",
  storageBucket: "use-for-green-mini-project.appspot.com",
  messagingSenderId: "827585252297",
  appId: process.env.REACT_APP_FIREBASE_APPID
};

// Initialize Firebase
/* export */ const app = initializeApp(firebaseConfig);