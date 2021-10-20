// React Imports
import React, { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useClosableSnackbar } from "../../../../../Hooks";

// Firebase Imports
import "firebase/auth";
import firebase, { useAuth } from "../../../../../Utils/Config/firebase";
import { StyledFirebaseAuth } from "react-firebaseui";

// Redux Imports
import { changePopupState } from "../../../../../Redux";
import { PopupState } from "../../../../../Redux/display.slice";
import { useAppDispatch } from "../../../../../Store";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";
import {
  Button,
  CircularProgress,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Lock, Mail, Visibility, VisibilityOff } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap",
    margin: theme.spacing(2),
  },
  emailPassword: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    margin: theme.spacing(0, 2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  oauthContainer: {
    margin: theme.spacing(0, 1),
  },
  textField: {
    margin: theme.spacing(2),
  },
  forgotPassword: {
    marginTop: theme.spacing(-1.5),
    marginBottom: theme.spacing(2),
    marginLeft: "auto",
  },
  submit: {
    marginBottom: theme.spacing(2),
  },
  bottomText: {
    display: "flex",
    alignItems: "center",
  },
  changeSignIn: {
    marginLeft: theme.spacing(0.4),
  },
  spinner: {
    color: theme.palette.primary.contrastText,
    marginLeft: theme.spacing(1),
  },
}));

const NotLoggedIn: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <EmailPassword />
      <OAuthProviders />
    </div>
  );
};

interface SignInInputs {
  email: string;
  password: string;
}

const EmailPassword: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const { register, formState, handleSubmit } = useForm<SignInInputs>({
    mode: "onChange",
  });
  const { enqueueSnackbar } = useClosableSnackbar();
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<SignInInputs> = async (inputs) => {
    setLoading(true);

    try {
      const credential = isSignIn
        ? await auth.signInWithEmailAndPassword(inputs.email, inputs.password)
        : await auth.createUserWithEmailAndPassword(
            inputs.email,
            inputs.password
          );
      enqueueSnackbar(
        `${isSignIn ? "Signed in" : "Registered"} as ${
          credential.user?.displayName ?? credential.user?.email
        }`,
        {
          variant: "success",
        }
      );
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
    <div className={classes.emailPassword}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="email"
          label="Email"
          error={!!formState.errors.email}
          helperText={formState.errors.email?.message}
          className={classes.textField}
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
        <TextField
          type={showPassword ? "text" : "password"}
          label="Password"
          error={!!formState.errors.password}
          helperText={formState.errors.password?.message}
          className={classes.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          {...register("password", {
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 100,
              message: "Password must be less than 100 characters",
            },
            required: "Password is required",
          })}
        />
        <FormHelperText className={classes.forgotPassword}>
          <Link
            component="button"
            onClick={() =>
              dispatch(changePopupState(PopupState.FORGOT_PASSWORD))
            }
          >
            Forgot Password?
          </Link>
        </FormHelperText>
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
          {isSignIn ? "Sign In" : "Register"}
          {loading && (
            <CircularProgress size="1.25rem" className={classes.spinner} />
          )}
        </Button>
      </form>
      <Typography variant="body2" className={classes.bottomText}>
        {isSignIn ? "Don't" : "Already"} have an account?{" "}
        <Link
          component="button"
          variant="body2"
          onClick={() => setIsSignIn(!isSignIn)}
          className={classes.changeSignIn}
        >
          {isSignIn ? "Register" : "Sign In"}!
        </Link>
      </Typography>
    </div>
  );
};

const OAuthProviders: FC = () => {
  const classes = useStyles();
  const auth = useAuth();
  const { enqueueSnackbar } = useClosableSnackbar();

  return (
    <StyledFirebaseAuth
      firebaseAuth={auth}
      className={classes.oauthContainer}
      uiConfig={{
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        ],
        signInFlow: "popup",
        callbacks: {
          signInSuccessWithAuthResult(result) {
            const isNew = result.additionalUserInfo.isNewUser;
            const { name, email } = result.additionalUserInfo.profile;

            if (isNew) {
              enqueueSnackbar(`Registered as ${name ?? email}`, {
                variant: "success",
              });
            } else {
              enqueueSnackbar(`Signed in as ${name ?? email}`, {
                variant: "success",
              });
            }
            return false;
          },
          async signInFailure(err) {
            enqueueSnackbar(err.message, {
              variant: "error",
            });
          },
        },
      }}
    />
  );
};

export default NotLoggedIn;
