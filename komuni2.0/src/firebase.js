// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2piahZOyFLM1rrXjOL3DdbN7rEtoC3pM",
  authDomain: "komuni-307be.firebaseapp.com",
  projectId: "komuni-307be",
  storageBucket: "komuni-307be.firebasestorage.app",
  messagingSenderId: "154965579908",
  appId: "1:154965579908:web:9b923c5138d5d5c79d0ad1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };