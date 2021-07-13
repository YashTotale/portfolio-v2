// Firebase Imports
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/performance";
import "firebase/firestore";

export const config = {
  apiKey: "AIzaSyBkV0LzaVCDpgr6-f-60MArbZWlyJ7utYU",
  authDomain: "yashtotale.firebaseapp.com",
  projectId: "yash-totale",
  storageBucket: "yash-totale.appspot.com",
  messagingSenderId: "37331567202",
  appId: "1:37331567202:web:b43727254e04928d8d073b",
  measurementId: "G-ZYHGJMGVV8",
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const performance = firebase.performance();
export const analytics = firebase.analytics();

export default firebase;
