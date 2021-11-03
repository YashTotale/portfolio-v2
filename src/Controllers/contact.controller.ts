// Firebase Imports
import firebase from "../Utils/Config/firebase";
import { httpsCallable } from "./helpers/functions";
import { ContactData } from "../../types/contact";

export const sendContactEmail = async (
  data: ContactData
): Promise<firebase.functions.HttpsCallableResult> =>
  await httpsCallable<ContactData>("sendContactEmail", data);
