// React Imports
import React, { FC } from "react";
import { Link } from "react-router-dom";

// Redux Imports
import { changePopupState } from "../../../Redux";
import { PopupState } from "../../../Redux/display.slice";
import { useAppDispatch } from "../../../Store";

// Material UI Imports
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const SignInRequired: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <DialogTitle>Authentication Required</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You must sign in or register to perform this action.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          component={Link}
          onClick={() => dispatch(changePopupState(PopupState.CLOSED))}
          to={{
            pathname: "/settings",
            hash: "#profile",
          }}
        >
          Go to Sign In
        </Button>
      </DialogActions>
    </>
  );
};

export default SignInRequired;
