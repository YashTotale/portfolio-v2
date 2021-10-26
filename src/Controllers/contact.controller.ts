// Firebase Imports
import firebase from "../Utils/Config/firebase";
import { httpsCallable } from "./helpers/functions";

export const sendContactEmail = async (
  data: Record<string, any>
): Promise<firebase.functions.HttpsCallableResult> =>
  await httpsCallable("sendContactEmail", data);
