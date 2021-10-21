// Firebase Imports
import { Collection, createDoc, DocumentData } from "./firestore.helpers";

export const createContactDoc = (data: DocumentData): Promise<DocumentData> =>
  createDoc(Collection.Contact, data);

export const createContactErrorDoc = (
  data: DocumentData
): Promise<DocumentData> => createDoc(Collection.ContactErrors, data);
