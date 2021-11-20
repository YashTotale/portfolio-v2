// Firebase Imports
import {
  httpsCallable as functionsHTTPs,
  HttpsCallableResult,
} from "firebase/functions";
import { functions } from "../../Utils/Config/firebase";

export const httpsCallable = async <T = unknown>(
  name: string,
  data: T
): Promise<HttpsCallableResult> => {
  const func = functionsHTTPs(functions, name);
  return await func(data);
};
