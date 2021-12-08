// React Imports
import React, { FC } from "react";

// Redux Imports
import { changePopupState } from "../../../../../../Redux";
import { PopupState } from "../../../../../../Redux/display.slice";
import { useAppDispatch } from "../../../../../../Store";

// Material UI Imports
import { Button, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  deleteContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    padding: theme.spacing(1.5, 1),
  },
}));

const Delete: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const onClick = async () => {
    dispatch(changePopupState(PopupState.DELETE_ACCOUNT));
  };

  return (
    <div className={classes.deleteContainer}>
      <Button
        variant="outlined"
        color="error"
        size={isSizeXS ? "small" : "medium"}
        onClick={onClick}
      >
        Delete Account
      </Button>
    </div>
  );
};

export default Delete;
