// Firebase Imports
import {
  collection as collectionFunc,
  CollectionReference,
  query,
  doc,
  setDoc as setFirestoreDoc,
  UpdateData,
  updateDoc as updateFirestoreDoc,
  WhereFilterOp,
  where,
  getDocs,
  PartialWithFieldValue,
  DocumentReference,
  WithFieldValue,
} from "firebase/firestore";
import { firestore } from "../../Utils/Config/firebase";
import { Collections, Schema, WithId } from "../../../types/firestore";

export const createDoc = async <T extends Schema[Collections]>(
  collection: CollectionReference<T>,
  data: WithFieldValue<T>,
  id?: string
): Promise<void> => {
  const docRef = getDocRef(collection, id);
  return await setFirestoreDoc(docRef, data);
};

export const updateDoc = async <T extends Schema[Collections]>(
  collection: CollectionReference<T>,
  id: string,
  data: UpdateData<T>
): Promise<void> => {
  const docRef = getDocRef(collection, id);
  return await updateFirestoreDoc(docRef, data);
};

export const updateOrCreateDoc = async <T extends Schema[Collections]>(
  collection: CollectionReference<T>,
  id: string,
  data: PartialWithFieldValue<T>
): Promise<void> => {
  const docRef = doc(collection, id);
  return await setFirestoreDoc(docRef, data, { merge: true });
};

type QueryOptions<T extends Schema[Collections]> = {
  field: keyof T;
  operation: WhereFilterOp;
  value: any;
};

export const queryCollection = async <T extends Schema[Collections]>(
  collection: CollectionReference<T>,
  options: QueryOptions<T>
): Promise<WithId<T>[]> => {
  const q = query(
    collection,
    where(options.field as string, options.operation, options.value)
  );
  const response = await getDocs(q);
  return response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getCollectionRef = <T extends Collections>(
  collection: T
): CollectionReference<Schema[T]> =>
  collectionFunc(firestore, collection) as CollectionReference<Schema[T]>;

export const getDocRef = <T extends Schema[Collections]>(
  collection: CollectionReference<T>,
  id?: string
): DocumentReference<T> => doc(collection, id);
