// External Imports
import Joi from "joi";

// Internal Imports
import { onCall } from "./helpers/functions";

type Data = Record<string, any>;

const dataSchema = Joi.object<Data>();

const sendContactEmail = onCall<Data>({
  name: "Send Contact Email",
  schema: dataSchema,
  handler: (data, context) => {
    //
  },
});

export default sendContactEmail;
