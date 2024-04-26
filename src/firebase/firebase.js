// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEvM14sDFextLSWXRypA5p3SPbsWx2IaU",
  authDomain: "petshoptechno.firebaseapp.com",
  projectId: "petshoptechno",
  storageBucket: "petshoptechno.appspot.com",
  messagingSenderId: "91615761197",
  appId: "1:91615761197:web:c1080e6af5ab2cb8e439a4",
  measurementId: "G-MLNXJSC683"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
