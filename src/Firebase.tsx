// React Imports
import React, { FC } from "react";

// Firebase Imports
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
} from "reactfire";
import { auth, firebaseApp, firestore } from "./Utils/Config/firebase";

const FirebaseProvider: FC = (props) => {
  return (
    <FirebaseAppProvider firebaseApp={firebaseApp}>
      <FirestoreProvider sdk={firestore}>
        <AuthProvider sdk={auth}>{props.children}</AuthProvider>
      </FirestoreProvider>
    </FirebaseAppProvider>
  );
};

export default FirebaseProvider;
