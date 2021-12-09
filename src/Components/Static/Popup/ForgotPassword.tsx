// React Imports
import React, { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useClosableSnackbar } from "../../../Hooks";

// Firebase Imports
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../Utils/Config/firebase";

// Redux Imports
import { changePopupState } from "../../../Redux";
import { PopupType } from "../../../Redux/display.slice";
import { useAppDispatch } from "../../../Store";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Mail } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  helpText: {
    marginBottom: theme.spacing(2.5),
  },
  submit: {
    marginTop: theme.spacing(2),
  },
  spinner: {
    color: theme.palette.primary.contrastText,
    marginLeft: theme.spacing(1),
  },
}));

interface Inputs {
  email: string;
}

const ForgotPassword: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useClosableSnackbar();
  const { formState, register, handleSubmit } = useForm<Inputs>({
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, inputs.email, {
        url: window.location.href,
      });
      enqueueSnackbar(`Password recovery email sent to ${inputs.email}`, {
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
      <DialogTitle>Forgot Password</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.helpText}>
          Enter your email to recover your password.
        </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            type="email"
            label="Email"
            error={!!formState.errors.email}
            helperText={formState.errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail fontSize="small" />
                </InputAdornment>
              ),
            }}
            fullWidth
            {...register("email", {
              required: "Email is required",
            })}
          />
          <DialogActions>
            <Button
              variant="contained"
              type="submit"
              disabled={loading || !formState.isValid}
              style={
                !formState.isValid
                  ? {
                      pointerEvents: "auto",
                      cursor: "not-allowed",
                    }
                  : undefined
              }
              className={classes.submit}
            >
              Send Recovery Email
              {loading && (
                <CircularProgress size="1.25rem" className={classes.spinner} />
              )}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </>
  );
};

export default ForgotPassword;
