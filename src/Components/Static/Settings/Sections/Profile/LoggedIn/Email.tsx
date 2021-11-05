// React Imports
import React, { FC, useState } from "react";
import clsx from "clsx";
import { ProfileProps } from "./index";
import { useClosableSnackbar } from "../../../../../../Hooks";

// Material UI Imports
import {
  CircularProgress,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Check, ReportGmailerrorred } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "75%",
    position: "relative",
    margin: theme.spacing(0.5, 0),
  },
  email: {
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  icon: {
    position: "absolute",
    right: theme.spacing(-3.5),
  },
  iconButton: {
    position: "absolute",
    right: theme.spacing(-4.5),
  },
  verified: {
    color: theme.palette.text.secondary,
  },
  savingSpinner: {
    color: theme.palette.text.disabled,
  },
}));

const Email: FC<ProfileProps> = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useClosableSnackbar();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));
  const [isSending, setIsSending] = useState(false);

  if (!props.userDoc) return <Loading />;

  const email = props.userDoc.email;
  const onVerify = async () => {
    setIsSending(true);
    try {
      await props.user.sendEmailVerification({
        url: window.location.href,
      });
      enqueueSnackbar(`Verification email sent to ${email}`, {
        variant: "success",
      });
    } catch (e: any) {
      const message = typeof e === "string" ? e : e.message;
      enqueueSnackbar(message || "An error occurred. Please try again.", {
        variant: "error",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={classes.container}>
      <Typography
        className={classes.email}
        variant={isSizeXS ? "subtitle2" : "subtitle1"}
      >
        {email}
      </Typography>
      {!isSending ? (
        props.user.emailVerified ? (
          <Tooltip title="Verified">
            <Check
              fontSize="small"
              className={clsx(classes.icon, classes.verified)}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Verify Email">
            <IconButton
              size="small"
              onClick={onVerify}
              className={classes.iconButton}
            >
              <ReportGmailerrorred fontSize="small" />
            </IconButton>
          </Tooltip>
        )
      ) : (
        <CircularProgress
          size={theme.spacing(2.5)}
          className={clsx(classes.icon, classes.savingSpinner)}
        />
      )}
    </div>
  );
};

const useLoadingStyles = makeStyles((theme) => ({
  loading: {
    margin: theme.spacing(0.5, 0),
  },
}));

const Loading: FC = () => {
  const classes = useLoadingStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Skeleton variant="rectangular" className={classes.loading}>
      <Typography variant={isSizeXS ? "subtitle2" : "subtitle1"}>
        long_filler@username.test
      </Typography>
    </Skeleton>
  );
};

export default Email;
