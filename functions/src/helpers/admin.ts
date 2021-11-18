// External Imports
import admin from "firebase-admin";

// Internal Imports
import serviceAccount from "../service-account.json";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
  }),
});

export const auth = admin.auth();

export const storage = admin.storage();
export const bucket = storage.bucket("yash-totale.appspot.com");

export const firestore = admin.firestore;
export const db = admin.firestore();
db.settings({
  ignoreUndefinedProperties: true,
});
