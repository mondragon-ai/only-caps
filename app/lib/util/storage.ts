// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZfMGc1recDJhnDzOqCUET84-3bPbSZ7w",
  authDomain: "pod-bigly.firebaseapp.com",
  projectId: "pod-bigly",
  storageBucket: "pod-bigly.appspot.com",
  messagingSenderId: "418313384838",
  appId: "1:418313384838:web:026f7145d7078f7b43b207",
  measurementId: "G-2VSLB6HP4J",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
// export const db = getFirestore()

export const storage = getStorage(app);
