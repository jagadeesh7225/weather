// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4YYOAtSL7prDyxO3eXbXlGHoASjg172c",
  authDomain: "weather-e9de7.firebaseapp.com",
  projectId: "weather-e9de7",
  storageBucket: "weather-e9de7.firebasestorage.app",
  messagingSenderId: "100591227602",
  appId: "1:100591227602:web:1c107b02a9cdaf79a7130b",
  measurementId: "G-7J802STQQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const signInWithGoogle = async () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};