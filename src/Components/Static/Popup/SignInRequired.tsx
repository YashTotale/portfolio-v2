// React Imports
import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTitle } from "../../../Context/HeadContext";
import { generateSearch } from "../../../Utils/funcs";

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
  const location = useLocation();
  const title = useTitle();

  return (
    <>
      <DialogTitle>Sign In Required</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You need to sign in to perform this action.
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
            search: generateSearch(
              {
                from_path: location.pathname,
                from_type: "sign_in_popup",
              },
              title
            ),
          }}
        >
          Go to Sign In
        </Button>
      </DialogActions>
    </>
  );
};

export default SignInRequired;
