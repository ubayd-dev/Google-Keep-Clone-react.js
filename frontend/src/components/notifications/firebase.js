// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf4SfpMexd5BGK9V6Tfb8vn4S6xv2zsPg",
  authDomain: "keep-pushnotifications.firebaseapp.com",
  projectId: "keep-pushnotifications",
  storageBucket: "keep-pushnotifications.firebasestorage.app",
  messagingSenderId: "65990803343",
  appId: "1:65990803343:web:c0f8303d91bf6707aad5fa",
  measurementId: "G-M50105MRCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);