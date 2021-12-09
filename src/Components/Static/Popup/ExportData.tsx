// React Imports
import React, { FC, useState } from "react";
import { stringify } from "yaml";
import { parse } from "json2csv";
import fileDownload from "js-file-download";
import { useClosableSnackbar } from "../../../Hooks";

// Redux Imports
import { useSelector } from "react-redux";
import { changePopupState, getPopupState } from "../../../Redux";
import { PopupType } from "../../../Redux/display.slice";
import { useAppDispatch } from "../../../Store";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    justifyContent: "center",
  },
  spinner: {
    color: theme.palette.error.contrastText,
    marginLeft: theme.spacing(1),
  },
}));

enum ExportType {
  JSON = "json",
  CSV = "csv",
  YAML = "yaml",
}

interface ExportState {
  label: string;
  fileName: string;
  data: any[];
}

const ExportData: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useClosableSnackbar();

  const popupState: ExportState = useSelector(getPopupState);
  const [type, setType] = useState(ExportType.JSON);
  const [loading, setLoading] = useState(false);

  if (
    !popupState ||
    !popupState.label ||
    !popupState.fileName ||
    !Array.isArray(popupState.data)
  ) {
    dispatch(changePopupState(PopupType.CLOSED));
    return null;
  }

  const getDataStr = (): string => {
    switch (type) {
      case ExportType.JSON: {
        return JSON.stringify(popupState.data, null, 2);
      }
      case ExportType.CSV: {
        return parse(popupState.data);
      }
      case ExportType.YAML: {
        return stringify(popupState.data, {
          indent: 4,
        });
      }
    }
  };

  const onExport = async () => {
    setLoading(true);

    try {
      const data = getDataStr();
      fileDownload(data, `${popupState.fileName}.${type}`);
      enqueueSnackbar(`Exported ${popupState.label}`, {
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
      <DialogTitle>Select Format to Export {popupState.label}</DialogTitle>
      <DialogContent className={classes.content}>
        <ToggleButtonGroup
          value={type}
          onChange={(e, val) => {
            if (val) setType(val);
          }}
          exclusive
          color="primary"
        >
          <ToggleButton value={ExportType.JSON}>JSON</ToggleButton>
          <ToggleButton value={ExportType.CSV}>CSV</ToggleButton>
          <ToggleButton value={ExportType.YAML}>YAML</ToggleButton>
        </ToggleButtonGroup>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" disabled={loading} onClick={onExport}>
          Export
          {loading && (
            <CircularProgress size="1.25rem" className={classes.spinner} />
          )}
        </Button>
      </DialogActions>
    </>
  );
};

export default ExportData;
