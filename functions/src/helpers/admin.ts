// External Imports
import { initializeApp, credential } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";

// Internal Imports
import serviceAccount from "../service-account.json";

const firebaseApp = initializeApp({
  credential: credential.cert({
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
  }),
});

export const auth = getAuth(firebaseApp);

export const storage = getStorage(firebaseApp);
export const bucket = storage.bucket("yash-totale.appspot.com");

export const db = getFirestore(firebaseApp);
db.settings({
  ignoreUndefinedProperties: true,
});
