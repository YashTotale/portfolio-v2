// React Imports
import { Dispatch, SetStateAction, useEffect, useState } from "react";

// Firebase Imports
import {
  CollectionReference,
  doc,
  getDoc as getFirestoreDoc,
  setDoc as setFirestoreDoc,
  updateDoc as updateFirestoreDoc,
  UpdateData,
  getDocs,
  PartialWithFieldValue,
  WithFieldValue,
  DocumentSnapshot,
  Query,
  DocumentData,
  collection,
} from "firebase/firestore";
import { WithId } from "../../../types/firestore";
import { firestore } from "../../Utils/Config/firebase";

/**
 * Documents
 */

// -> GET
export const fetchDoc = async <T extends DocumentData>(
  collection: CollectionReference<T>,
  id: string
): Promise<DocumentSnapshot<T>> => {
  const docRef = doc(collection, id);
  return await getFirestoreDoc(docRef);
};

export const getDocData = async <T extends DocumentData>(
  collection: CollectionReference<T>,
  id: string
): Promise<T | null> => {
  const doc = await fetchDoc(collection, id);
  if (doc.exists()) {
    return doc.data() ?? null;
  }
  return null;
};

export const getDocField = async <T extends DocumentData, K extends keyof T>(
  collection: CollectionReference<T>,
  id: string,
  field: K
): Promise<T[K] | null> => {
  const doc = await fetchDoc(collection, id);
  if (doc.exists()) {
    return doc.get(field as string) ?? null;
  }
  return null;
};

export const useDocDataOnce = <T extends DocumentData>(
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

export const useDocFieldOnce = <T extends DocumentData, K extends keyof T>(
  collection: CollectionReference<T>,
  id: string,
  field: K
): [T[K] | null, Dispatch<SetStateAction<T[K] | null>>] => {
  const [data, setData] = useState<T[K] | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const value = await getDocField(collection, id, field);
      if (isMounted) {
        setData(value ?? null);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [collection, id, field]);

  return [data, setData];
};

// -> UPDATE
export const createDoc = async <T extends DocumentData>(
  collection: CollectionReference<T>,
  data: WithFieldValue<T>,
  id?: string
): Promise<void> => {
  const docRef = doc(collection, id);
  return await setFirestoreDoc(docRef, data);
};

export const updateDoc = async <T extends DocumentData>(
  collection: CollectionReference<T>,
  id: string,
  data: UpdateData<T>
): Promise<void> => {
  const docRef = doc(collection, id);
  return await updateFirestoreDoc(docRef, data);
};

export const updateOrCreateDoc = async <T extends DocumentData>(
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
export const getCollection = <T extends DocumentData>(
  path: string,
  ...paths: string[]
): CollectionReference<T> =>
  collection(firestore, path, ...paths) as CollectionReference<T>;

export const queryCollection = async <T extends DocumentData>(
  q: Query<T>
): Promise<WithId<T>[]> => {
  const response = await getDocs(q);
  return response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const useCollectionQueryOnce = <T extends DocumentData>(
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
