// React Imports
import React, { FC, ReactNode } from "react";
import {
  useSnackbar,
  OptionsObject,
  SnackbarKey,
  SnackbarMessage,
} from "notistack";

// Material UI Imports
import { Button, IconButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Clear } from "@mui/icons-material";

type NewOptions = OptionsObject & {
  onUndo?: () => void;
};

export type EnqueueSnackbar = (
  message: SnackbarMessage,
  options?: NewOptions
) => SnackbarKey;

interface NewProviderContext {
  enqueueSnackbar: EnqueueSnackbar;
  closeSnackbar: (key?: SnackbarKey) => void;
}

const useClosableSnackbar = (): NewProviderContext => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const enqueueClosableSnackbar = (
    message: ReactNode,
    options?: NewOptions
  ) => {
    const newOptions: OptionsObject = {
      ...options,
      action: (key: SnackbarKey) => {
        const action = options?.action
          ? typeof options.action === "function"
            ? options.action(key)
            : options.action
          : null;

        return (
          <>
            {action}
            <CloseButton onClick={() => closeSnackbar(key)} />
            {options?.onUndo && (
              <UndoButton
                onClick={() => {
                  options.onUndo!();
                  closeSnackbar(key);
                }}
              />
            )}
          </>
        );
      },
    };
    return enqueueSnackbar(message, newOptions);
  };

  return { enqueueSnackbar: enqueueClosableSnackbar, closeSnackbar };
};

const useButtonStyles = makeStyles((theme) => ({
  whiteButton: {
    color: theme.palette.common.white,
  },
}));

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: FC<CloseButtonProps> = (props) => {
  const classes = useButtonStyles();

  return (
    <IconButton
      onClick={props.onClick}
      size="small"
      className={classes.whiteButton}
    >
      <Clear fontSize="small" />
    </IconButton>
  );
};

interface UndoButtonProps {
  onClick: () => void;
}

const UndoButton: FC<UndoButtonProps> = (props) => {
  const classes = useButtonStyles();

  return (
    <Button
      className={classes.whiteButton}
      onClick={props.onClick}
      variant="text"
    >
      Undo
    </Button>
  );
};

export default useClosableSnackbar;
