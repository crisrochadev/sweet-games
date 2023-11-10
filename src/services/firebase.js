// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  child,
  push,
  update,
} from "firebase/database";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  FacebookAuthProvider,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBsBNX84OqY8p7o8PDc1_noqercPiGRtdU",
  authDomain: "sweet-play.firebaseapp.com",
  databaseURL: "https://sweet-play-default-rtdb.firebaseio.com",
  projectId: "sweet-play",
  storageBucket: "sweet-play.appspot.com",
  messagingSenderId: "625968247315",
  appId: "1:625968247315:web:8648b99cf47adabffcc5e6",
  measurementId: "G-4XCSE2RH82",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const provider = new GoogleAuthProvider();
export const faceProvider = new FacebookAuthProvider();

export const firebase = {
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
  set,
  ref,
  get,
  onValue,
  child,
  push,
  update,
};
