// React Imports
import React from "react";
import clsx from "clsx";
import { useClosableSnackbar } from "../../../Hooks";
import DynamicUnderline from "../../Atomic/DynamicUnderline";
import MatchHighlight from "../../Atomic/MatchHighlight";

// Redux Imports
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../Store";

// Material UI Imports
import { capitalize, Typography, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  element: {
    maxHeight: theme.spacing(3),
  },
}));

type TimelineProps<T extends string> = {
  sort: T;
  contentType: string;
  setCurrentSort: (sort: T) => any;
  getCurrentSort: (state: RootState) => T;
  children: string;
  withResize?: boolean;
  search?: string;
  className?: string;
};

const Timeline = <T extends string>(props: TimelineProps<T>): JSX.Element => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { enqueueSnackbar } = useClosableSnackbar();
  const currentSort = useSelector(props.getCurrentSort);

  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));
  const contentLabel = capitalize(props.contentType);

  const onClick = () => {
    const preCurrentSort = currentSort;
    dispatch(props.setCurrentSort(props.sort));
    enqueueSnackbar(`Sorted ${contentLabel} by '${props.sort}'`, {
      variant: "success",
      onUndo: () => {
        dispatch(props.setCurrentSort(preCurrentSort));
        enqueueSnackbar(
          `Reverted to Previous ${contentLabel} Sort (${preCurrentSort})`,
          {
            variant: "success",
          }
        );
      },
    });
  };

  return (
    <Typography
      align="center"
      variant={isSizeXS && props.withResize !== false ? "body2" : "body1"}
      className={clsx(classes.element, props.className)}
    >
      <DynamicUnderline
        tooltipLabel={`Sort ${capitalize(props.contentType)} by '${
          props.sort
        }'`}
        tooltipLabelEnabled={`Currently Sorted by '${props.sort}'`}
        onClick={onClick}
        enabled={currentSort === props.sort}
      >
        <MatchHighlight toMatch={props.search}>{props.children}</MatchHighlight>
      </DynamicUnderline>
    </Typography>
  );
};

export default Timeline;
