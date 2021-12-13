import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import dotenv from "dotenv";
// dotenv.config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
// console.log(process.env.REACT_APP_API_KEY);
// console.log(process.env.REACT_APP_AUTH_DOMAIN);
// console.log(process.env.REACT_APP_DATABASE_URL);
// console.log(process.env.REACT_APP_PROJECT_ID);
// console.log(process.env.REACT_APP_STORAGE_BUCKET);
// console.log(process.env.REACT_APP_MESSAGING_SENDERID);
// console.log(app);

export const authService = getAuth();
export const dbService = getFirestore();
