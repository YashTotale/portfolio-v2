// External Imports
import { https, logger } from "firebase-functions";
import Joi from "joi";

interface OnCallOptions<T> {
  name: string;
  handler: (data: T, context: https.CallableContext) => any;
  schema?: Joi.Schema;
}

export const onCall = <T>(options: OnCallOptions<T>) =>
  https.onCall(async (data: T, context) => {
    logger.log(`Running ${options.name}`);

    try {
      if (options.schema) {
        logger.info("Validating data...");
        const validationResult = options.schema.validate(data);
        if (validationResult.error) {
          logger.error("Validation Error", validationResult.error);
          throw validationResult.error;
        }
        logger.info("Validating data!");
      }

      return await options.handler(data, context);
    } catch (e: any) {
      logger.error(e.message);
      throw new https.HttpsError(e.code ?? "internal", e.message);
    }
  });
