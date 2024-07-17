// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT5WdvMlrSjNDO8N_IMU_Fox-xM1lcrs4",
  authDomain: "medifydoctor.firebaseapp.com",
  projectId: "medifydoctor",
  storageBucket: "medifydoctor.appspot.com",
  messagingSenderId: "120215392533",
  appId: "1:120215392533:web:a429da25a8ed7ecec3991c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
