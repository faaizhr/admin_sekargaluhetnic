
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDerrkUv6YJr7DUZZ2pmzLKgb3rlFJFBfc",
  authDomain: "sekargaluhetnic.firebaseapp.com",
  projectId: "sekargaluhetnic",
  storageBucket: "sekargaluhetnic.appspot.com",
  messagingSenderId: "20837747645",
  appId: "1:20837747645:web:c998c08216559d392f20d4",
  measurementId: "G-WPKC2DDYWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);