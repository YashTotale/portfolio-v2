// Internal Imports
import { Nullable } from "../../types/general";

// Firebase Imports
import firebase from "../Utils/Config/firebase";
import { useUser } from "../Context/UserContext";
import { createDocSnapshot, updateDoc } from "./helpers/firestore";
import { uploadFile } from "./helpers/storage";
import { httpsCallable } from "./helpers/functions";
import { WithId, PublicUserDoc, ImmutableUserDoc } from "../../types/firestore";

const publicCollection = "users" as const;
const immutableCollection = "users_immutable" as const;

export const useUserDoc = (): Nullable<
  WithId<PublicUserDoc & ImmutableUserDoc>
> => {
  const user = useUser();
  const usePublicData = createDocSnapshot(publicCollection);
  const useImmutableData = createDocSnapshot(immutableCollection);

  const publicData = usePublicData(user?.uid ?? "");
  const privateData = useImmutableData(user?.uid ?? "");

  if (!publicData || !privateData) return null;
  return { ...publicData, ...privateData };
};

export const createUser = async (
  user: firebase.User
): Promise<firebase.functions.HttpsCallableResult> => {
  const data: PublicUserDoc & ImmutableUserDoc = {
    name: user.displayName ?? "",
    email: user.email ?? "",
    picture: user.photoURL ?? "",
  };
  return await httpsCallable("createUserDoc", data);
};

export const updateUserName = async (
  user: firebase.User,
  newName: string
): Promise<void> => {
  await Promise.all([
    updateDoc(publicCollection, user.uid, { name: newName }),
    user.updateProfile({
      displayName: newName,
    }),
  ]);
};

export const uploadUserPicture = async (
  file: File,
  user: firebase.User
): Promise<void> => {
  const url = await uploadFile(file, {
    path: `users/${user.uid}/profile_pictures`,
  });
  await Promise.all([
    updateDoc(publicCollection, user.uid, { picture: url }),
    user.updateProfile({
      photoURL: url,
    }),
  ]);
};
