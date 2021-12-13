// External Imports
import { HttpsCallableResult } from "firebase/functions";

// Internal Imports
import { httpsCallable } from "./helpers/functions";
import { ContactData } from "../../types/contact";

export const sendContactEmail = async (
  data: ContactData
): Promise<HttpsCallableResult> =>
  await httpsCallable<ContactData>("sendContactEmail", data);
