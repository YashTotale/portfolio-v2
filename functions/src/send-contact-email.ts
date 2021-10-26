// External Imports
import * as functions from "firebase-functions";
import Joi from "joi";
import axios from "axios";

// Internal Imports
import { onCall } from "./helpers/functions";
import { firestore } from "./helpers/admin";

interface Data {
  name: string;
  email: string;
  message: string;
  timestamp: Date;
  "g-recaptcha-response": string;
  bugs?: string;
  rating?: number | null;
}

const dataSchema = Joi.object<Data>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required(),
  timestamp: Joi.date().required(),
  "g-recaptcha-response": Joi.string().required(),
  bugs: Joi.string().optional(),
  rating: Joi.number().optional().allow(null),
});

const sendContactEmail = onCall<Data>({
  name: "Send Contact Email",
  schema: dataSchema,
  handler: async (data, context) => {
    try {
      const formattedData = {
        service_id: functions.config().email.service_id,
        template_id: functions.config().email.template_id,
        user_id: functions.config().email.user_id,
        accessToken: functions.config().email.access_token,
        template_params: data,
      };
      await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        formattedData
      );
      await firestore
        .collection("contact")
        .doc()
        .set({ ...data, user: context.auth?.uid });
    } catch (e: any) {
      const message = typeof e === "string" ? e : e.message;
      await firestore
        .collection("contact-errors")
        .doc()
        .set({ data, error: message, user: context.auth?.uid });
      throw e;
    }
  },
});

export default sendContactEmail;
