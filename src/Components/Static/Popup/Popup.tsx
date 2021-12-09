// React Imports
import React, { FC } from "react";
import ForgotPassword from "./ForgotPassword";
import SignInRequired from "./SignInRequired";
import DeleteAccount from "./DeleteAccount";
import ExportData from "./ExportData";

// Redux Imports
import { useSelector } from "react-redux";
import { getPopupType, changePopupState } from "../../../Redux";
import { PopupType } from "../../../Redux/display.slice";
import { useAppDispatch } from "../../../Store";

// Material UI Imports
import { Dialog } from "@mui/material";

const Popup: FC = () => {
  const dispatch = useAppDispatch();
  const popupType = useSelector(getPopupType);
  const isOpen = popupType && popupType !== PopupType.CLOSED;

  const getPopupContent = () => {
    switch (popupType) {
      case PopupType.FORGOT_PASSWORD: {
        return <ForgotPassword />;
      }
      case PopupType.SIGN_IN_REQUIRED: {
        return <SignInRequired />;
      }
      case PopupType.DELETE_ACCOUNT: {
        return <DeleteAccount />;
      }
      case PopupType.EXPORT_DATA: {
        return <ExportData />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(changePopupState(PopupType.CLOSED))}
    >
      {getPopupContent()}
    </Dialog>
  );
};

export default Popup;
