// External Imports
import { CollectionReference } from "firebase-admin/firestore";
import { db } from "./admin";

export const deleteCollection = async (collection: CollectionReference) => {
  const batch = db.batch();
  const docs = await collection.listDocuments();
  docs.forEach((ref) => batch.delete(ref));
  await batch.commit();
};
