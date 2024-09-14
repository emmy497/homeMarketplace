// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDIGbcHmsyMDwnw78_melNIfWJQnF88cw",
  authDomain: "house-marketplace-app-32160.firebaseapp.com",
  projectId: "house-marketplace-app-32160",
  storageBucket: "house-marketplace-app-32160.appspot.com",
  messagingSenderId: "460521597230",
  appId: "1:460521597230:web:0829e100f977c7c263f2bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();