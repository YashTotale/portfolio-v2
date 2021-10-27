// External Imports
import * as functions from "firebase-functions";
import Joi from "joi";

interface OnCallOptions<T> {
  name: string;
  handler: (data: T, context: functions.https.CallableContext) => any;
  schema?: Joi.Schema;
}

export const onCall = <T>(options: OnCallOptions<T>) =>
  functions.https.onCall(async (data: T, context) => {
    functions.logger.log(`Running ${options.name}`);

    try {
      if (options.schema) {
        functions.logger.info("Validating data...");
        const validationResult = options.schema.validate(data);
        if (validationResult.error) {
          functions.logger.error("Validation Error", validationResult.error);
          throw validationResult.error;
        }
        functions.logger.info("Validating data!");
      }

      return await options.handler(data, context);
    } catch (e: any) {
      functions.logger.error(e.message);
      throw new functions.https.HttpsError(e.code ?? "internal", e.message);
    }
  });
