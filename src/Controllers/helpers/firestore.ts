// React Imports
import { useCallback, useEffect } from "react";

// Firebase Imports
import {
  collection as collectionFunc,
  CollectionReference,
  query,
  doc,
  onSnapshot,
  setDoc as setFirestoreDoc,
  UpdateData,
  updateDoc as updateFirestoreDoc,
  WhereFilterOp,
  where,
  getDocs,
  PartialWithFieldValue,
} from "firebase/firestore";
import { firestore } from "../../Utils/Config/firebase";
import { Collections, Schema, WithId } from "../../../types/firestore";

// Redux Imports
import { useSelector } from "react-redux";
import { getDoc, setDoc } from "../../Redux";
import { ReduxDoc } from "../../Redux/firebase.slice";
import { useAppDispatch } from "../../Store";

export const createDocSnapshot = <T extends Collections>(
  collection: T
): ((id: string) => ReduxDoc<T>) => {
  const collectionRef = collectionFunc(
    firestore,
    collection
  ) as CollectionReference<Schema[T]>;

  const useDocSnapshot = (id: string) => {
    const dispatch = useAppDispatch();
    const data = useSelector(getDoc(collection, id));

    const setData = useCallback(
      (d: ReduxDoc<T>) =>
        dispatch(
          setDoc({
            collection,
            docId: id,
            data: d,
          })
        ),
      [id, dispatch]
    );

    useEffect(() => {
      if (!id) setData(null);
      else {
        return onSnapshot(doc(collectionRef, id), (snap) => {
          if (!snap.exists()) {
            setData(null);
          } else {
            const data = snap.data();
            setData({ ...data, id: snap.id });
          }
        });
      }
    }, [id, setData]);

    return data;
  };

  return useDocSnapshot;
};

export const createDoc = async <T extends Collections>(
  collection: T,
  data: Schema[T],
  id?: string
): Promise<Schema[T]> => {
  const collectionRef = collectionFunc(
    firestore,
    collection
  ) as CollectionReference<Schema[T]>;
  const docRef = doc(collectionRef, id);
  await setFirestoreDoc(docRef, data);
  return data;
};

export const updateDoc = async <T extends Collections>(
  collection: T,
  id: string,
  data: UpdateData<Schema[T]>
): Promise<void> => {
  const collectionRef = collectionFunc(
    firestore,
    collection
  ) as CollectionReference<Schema[T]>;
  const docRef = doc(collectionRef, id);
  return await updateFirestoreDoc(docRef, data);
};

export const updateOrCreateDoc = async <T extends Collections>(
  collection: T,
  id: string,
  data: PartialWithFieldValue<Schema[T]>
): Promise<void> => {
  const collectionRef = collectionFunc(
    firestore,
    collection
  ) as CollectionReference<Schema[T]>;
  const docRef = doc(collectionRef, id);
  return await setFirestoreDoc(docRef, data, { merge: true });
};

type QueryOptions<T extends Collections> = {
  field: keyof Schema[T];
  operation: WhereFilterOp;
  value: any;
};

export const queryCollection = async <T extends Collections>(
  collection: T,
  options: QueryOptions<T>
): Promise<WithId<Schema[T]>[]> => {
  const collectionRef = collectionFunc(
    firestore,
    collection
  ) as CollectionReference<Schema[T]>;

  const q = query(
    collectionRef,
    where(options.field as string, options.operation, options.value)
  );
  const response = await getDocs(q);

  return response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
