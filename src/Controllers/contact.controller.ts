// Firebase Imports
import { createDoc, DocumentData, Schema } from "./firestore.helpers";

export const createContactDoc = (data: DocumentData): Promise<DocumentData> =>
  createDoc("contact", data);

export interface ContactError {
  error: string;
  data: Schema["contact"];
}

export const createContactErrorDoc = (
  data: ContactError
): Promise<ContactError> => createDoc("contact-errors", data);
