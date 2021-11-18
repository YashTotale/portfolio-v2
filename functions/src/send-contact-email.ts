// External Imports
import * as functions from "firebase-functions";
import Joi from "joi";
import axios from "axios";

// Internal Imports
import { onCall } from "./helpers/functions";
import { db } from "./helpers/admin";
import { ContactData } from "../../types/contact";

type FormattedData = Omit<ContactData, "timestamp"> & {
  timestamp: Date;
};

const dataSchema = Joi.object<ContactData, true>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required(),
  timestamp: Joi.number().required(),
  "g-recaptcha-response": Joi.string().required(),
  bugs: Joi.string().optional(),
  rating: Joi.number().optional().allow(null),
})
  .strict(true)
  .unknown(false);

const sendContactEmail = onCall<ContactData>({
  name: "Send Contact Email",
  schema: dataSchema,
  handler: async (data, context) => {
    const formattedData: FormattedData = {
      ...data,
      timestamp: new Date(data.timestamp),
    };

    try {
      await verifyRecaptcha(formattedData["g-recaptcha-response"]);
      await postEmail(formattedData);
      await db
        .collection("contact")
        .doc()
        .set({
          ...formattedData,
          user: context.auth?.uid,
        });
    } catch (e: any) {
      const message = typeof e === "string" ? e : e.message;
      await db
        .collection("contact-errors")
        .doc()
        .set({ data: formattedData, error: message, user: context.auth?.uid });
      throw e;
    }
  },
});

const verifyRecaptcha = async (recaptchaResponse: string) => {
  functions.logger.info("Verifying ReCAPTCHA...");
  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${
      functions.config().email.recaptcha_secret_key
    }&response=${recaptchaResponse}`
  );
  if (!res.data.success) {
    const errors = res.data["error-codes"].join(", ");
    throw new Error(
      `ReCAPTCHA Verification Failed (${errors}). Please try again.`
    );
  }
  functions.logger.info("Verified ReCAPTCHA!");
};

const postEmail = async (data: FormattedData) => {
  functions.logger.info("Sending Email...");
  const postData = {
    service_id: functions.config().email.service_id,
    template_id: functions.config().email.template_id,
    user_id: functions.config().email.user_id,
    accessToken: functions.config().email.access_token,
    template_params: data,
  };
  await axios.post("https://api.emailjs.com/api/v1.0/email/send", postData);
  functions.logger.info("Sent Email!");
};

export default sendContactEmail;
