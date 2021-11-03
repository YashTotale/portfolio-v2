// Firebase Imports
import "firebase/functions";
import firebase, { getFunctions } from "../../Utils/Config/firebase";

export const httpsCallable = async <T = unknown>(
  name: string,
  data: T
): Promise<firebase.functions.HttpsCallableResult> => {
  const functions = getFunctions();
  const func = functions.httpsCallable(name);
  return await func(data);
};
