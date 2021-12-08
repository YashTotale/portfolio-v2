// React Imports
import { Dispatch, SetStateAction, useEffect, useState } from "react";

// Firebase Imports
import {
  collection as collectionFunc,
  CollectionReference,
  doc,
  getDoc as getFirestoreDoc,
  setDoc as setFirestoreDoc,
  updateDoc as updateFirestoreDoc,
  UpdateData,
  getDocs,
  PartialWithFieldValue,
  DocumentReference,
  WithFieldValue,
  DocumentSnapshot,
  Query,
  DocumentData,
} from "firebase/firestore";
import { firestore } from "../../Utils/Config/firebase";
import { Collections, Schema, WithId } from "../../../types/firestore";

/**
 * Documents
 */

// -> GET
export const getDocRef = <T extends Schema[Collections]>(
  collection: CollectionReference<T>,
  id?: string
): DocumentReference<T> => doc(collection, id);

export const getDoc = async <T extends Schema[Collections]>(
  collection: CollectionReference<T>,
  id: string
): Promise<DocumentSnapshot<T>> => {
  const docRef = getDocRef(collection, id);
  return await getFirestoreDoc(docRef);
};

export const getDocData = async <T extends Schema[Collections]>(
  collection: CollectionReference<T>,
  id: string
): Promise<T | null> => {
  const docRef = getDocRef(collection, id);
  const doc = await getFirestoreDoc(docRef);
  if (doc.exists()) {
    return doc.data() ?? null;
  }
  return null;
};

export const useDocFieldOnce = <
  T extends Schema[Collections],
  K extends keyof T
>(
  collection: CollectionReference<T>,
  id: string,
  field: K
): [T[K] | null, Dispatch<SetStateAction<T[K] | null>>] => {
  const [data, setData] = useState<T[K] | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const doc = await getDocData(collection, id);
      if (isMounted) {
        setData(doc?.[field] ?? null);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [collection, id, field]);

  return [data, setData];
};

export const useDocDataOnce = <T extends Schema[Collections]>(
  collection: CollectionReference<T>,
  id: string
): [T | null, Dispatch<SetStateAction<T | null>>] => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const doc = await getDocData(collection, id);
      if (isMounted) {
        setData(doc ?? null);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [collection, id]);

  return [data, setData];
};

// -> UPDATE
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

/**
 * Collections
 */

// -> GET
export const getCollectionRef = <T extends Collections>(
  collection: T
): CollectionReference<Schema[T]> =>
  collectionFunc(firestore, collection) as CollectionReference<Schema[T]>;

export const getSubCollectionRef = <T extends DocumentData>(
  ...paths: string[]
): CollectionReference<T> =>
  collectionFunc(
    firestore,
    paths[0],
    ...paths.slice(1)
  ) as CollectionReference<T>;

export const queryCollection = async <T extends Schema[Collections]>(
  q: Query<T>
): Promise<WithId<T>[]> => {
  const response = await getDocs(q);
  return response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const useCollectionQueryOnce = <T extends Schema[Collections]>(
  q: Query<T>
): WithId<T>[] => {
  const [data, setData] = useState<WithId<T>[]>([]);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const queried = await queryCollection(q);
      if (isMounted) setData(queried);
    })();

    return () => {
      isMounted = false;
    };
  }, [q]);

  return data;
};
