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
import {
  capitalize,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  element: {
    maxHeight: theme.spacing(3),
  },
}));

type TimelineProps<T extends string> = {
  sort: T;
  contentType: string;
  setCurrentSort: (sort: T) => any;
  getCurrentSort: (state: RootState) => string;
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

  return (
    <Typography
      align="center"
      variant={isSizeXS && props.withResize !== false ? "body2" : "body1"}
      className={clsx(classes.element, props.className)}
    >
      <DynamicUnderline
        tooltipLabel={`Sort by '${props.sort}'`}
        onClick={() => {
          dispatch(props.setCurrentSort(props.sort));
          enqueueSnackbar(
            `Sorted ${capitalize(props.contentType)} by '${props.sort}'`,
            {
              variant: "success",
            }
          );
        }}
        enabled={currentSort !== props.sort}
      >
        <MatchHighlight toMatch={props.search}>{props.children}</MatchHighlight>
      </DynamicUnderline>
    </Typography>
  );
};

export default Timeline;
