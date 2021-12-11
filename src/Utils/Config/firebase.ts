// Firebase Imports
import { initializeApp } from "firebase/app";
import { getPerformance } from "firebase/performance";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

export const config = {
  apiKey: "AIzaSyBkV0LzaVCDpgr6-f-60MArbZWlyJ7utYU",
  authDomain: "yash-totale.firebaseapp.com",
  projectId: "yash-totale",
  storageBucket: "yash-totale.appspot.com",
  messagingSenderId: "37331567202",
  appId: "1:37331567202:web:b43727254e04928d8d073b",
  measurementId: "G-ZYHGJMGVV8",
};

export const firebaseApp = initializeApp(config);

// Do not commit with 'isEmulator = true'!
export const isEmulator = true;

export const performance = getPerformance(firebaseApp);
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const functions = getFunctions(firebaseApp);
export const storage = getStorage(firebaseApp);
export const analytics = getAnalytics(firebaseApp);

if (isEmulator && process.env.NODE_ENV !== "production") {
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectFirestoreEmulator(firestore, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectStorageEmulator(storage, "localhost", 9199);
}
