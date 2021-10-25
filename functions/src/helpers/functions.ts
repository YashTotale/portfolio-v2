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

    if (options.schema) {
      functions.logger.info("Validating data...");
      const validationResult = options.schema.validate(data);
      if (validationResult.error) {
        functions.logger.error("Validation Error", validationResult.error);
        throw validationResult.error;
      }
    }

    await options.handler(data, context);
  });
