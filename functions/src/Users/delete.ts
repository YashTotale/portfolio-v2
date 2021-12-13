// External Imports
import { Output } from "@hack4impact/logger";

// Internal Imports
import { onCall } from "../helpers/functions";
import DeleteUser from "../helpers/users/delete";

const deleteUser = onCall({
  name: "Delete User",
  handler: async (data, context) => {
    if (!context.auth) {
      throw new Error("Cannot delete user as the user is not logged in.");
    }

    await new DeleteUser(context.auth.uid, new Output()).entry();
  },
});

export default deleteUser;
