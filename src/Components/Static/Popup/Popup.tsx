// React Imports
import React, { FC } from "react";
import ForgotPassword from "./ForgotPassword";

// Redux Imports
import { useSelector } from "react-redux";
import { getPopupState, changePopupState } from "../../../Redux";
import { PopupState } from "../../../Redux/display.slice";
import { useAppDispatch } from "../../../Store";

// Material UI Imports
import { Dialog } from "@mui/material";

const Popup: FC = () => {
  const dispatch = useAppDispatch();
  const popupState = useSelector(getPopupState);
  const isOpen = popupState && popupState !== PopupState.CLOSED;

  const getPopupContent = () => {
    switch (popupState) {
      case PopupState.FORGOT_PASSWORD: {
        return <ForgotPassword />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(changePopupState(PopupState.CLOSED))}
    >
      {getPopupContent()}
    </Dialog>
  );
};

export default Popup;
