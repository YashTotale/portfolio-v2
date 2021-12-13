// React Imports
import React, { FC, useState } from "react";
import { useClosableSnackbar } from "../../../Hooks";

// Redux Imports
import { changePopupState } from "../../../Redux";
import { PopupType } from "../../../Redux/display.slice";
import { useAppDispatch } from "../../../Store";

// Firebase Imports
import { signOut } from "firebase/auth";
import { deleteUser } from "../../../Controllers/user.controller";
import { auth } from "../../../Utils/Config/firebase";

// Material UI Imports
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useUser } from "../../../Context/UserContext";

const useStyles = makeStyles((theme) => ({
  spinner: {
    color: theme.palette.error.contrastText,
    marginLeft: theme.spacing(1),
  },
}));

const DeleteAccount: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useClosableSnackbar();
  const user = useUser();
  const [loading, setLoading] = useState(false);

  if (!user) {
    dispatch(changePopupState(PopupType.CLOSED));
    return null;
  }

  const onDelete = async () => {
    setLoading(true);

    try {
      await deleteUser(user.uid);
      await signOut(auth);
      enqueueSnackbar("Deleted Account", {
        variant: "success",
      });
      dispatch(changePopupState(PopupType.CLOSED));
    } catch (e: any) {
      const message = typeof e === "string" ? e : e.message;
      enqueueSnackbar(message || "An error occurred. Please try again.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogTitle>Confirm Delete Account</DialogTitle>
      <DialogContent>
        Are you sure you want to delete your account? If you delete your
        account, it cannot be recovered.
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          disabled={loading}
          onClick={onDelete}
        >
          Delete Account
          {loading && (
            <CircularProgress size="1.25rem" className={classes.spinner} />
          )}
        </Button>
      </DialogActions>
    </>
  );
};

export default DeleteAccount;
