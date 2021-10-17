//React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { useClosableSnackbar } from "../../../../../Hooks";
import StyledLink from "../../../../Atomic/StyledLink";
import MatchHighlight from "../../../../Atomic/MatchHighlight";
import DynamicUnderline from "../../../../Atomic/DynamicUnderline";
import { useTitle } from "../../../../../Context/HeadContext";
import { ResolvedEducation } from "../../../../../Utils/types";
import { generateSearch } from "../../../../../Utils/funcs";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getEducationTypeFilter,
  setEducationTypeFilter,
} from "../../../../../Redux";
import { useAppDispatch } from "../../../../../Store";

// Material UI Imports
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  title: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
    width: "100%",
    marginTop: theme.spacing(1),
    padding: theme.spacing(0, 12),

    [theme.breakpoints.only("sm")]: {
      padding: theme.spacing(0, 9),
    },

    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(0, 8),
    },
  },
  subtitle: {
    marginBottom: theme.spacing(1),
    maxHeight: theme.spacing(3.5),
  },
}));

type TitleProps = ResolvedEducation & {
  search?: string;
};

const Title: FC<TitleProps> = (props) => {
  const classes = useStyles();

  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const location = useLocation();
  const pageTitle = useTitle();

  return (
    <>
      <StyledLink
        to={{
          pathname: `/education/${props.slug}`,
          search: generateSearch(
            {
              from_path: location.pathname,
              from_type: "preview_title",
            },
            pageTitle
          ),
        }}
        variant={isSizeXS ? "h5" : "h4"}
        className={classes.title}
        toMatch={props.search}
      >
        {props.title}
      </StyledLink>
      <Subtitle {...props} />
    </>
  );
};

type SubtitleProps = ResolvedEducation & {
  search?: string;
};

const Subtitle: FC<SubtitleProps> = (props) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { enqueueSnackbar } = useClosableSnackbar();

  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const typeFilter = useSelector(getEducationTypeFilter);
  const alreadyFiltered = typeFilter === props.type;

  const onClick = () => {
    const currentType = typeFilter;
    dispatch(setEducationTypeFilter(props.type));
    enqueueSnackbar(`Filtered Education by '${props.type}'`, {
      variant: "success",
      onUndo: () => {
        dispatch(setEducationTypeFilter(currentType));
        enqueueSnackbar(
          `Reverted to Previous Education Filter (${currentType ?? "None"})`,
          {
            variant: "success",
          }
        );
      },
    });
  };

  const onRemove = () => {
    const currentType = typeFilter;
    dispatch(setEducationTypeFilter(null));
    enqueueSnackbar(`Removed '${props.type}' Filter`, {
      variant: "success",
      onUndo: () => {
        dispatch(setEducationTypeFilter(currentType));
        enqueueSnackbar(
          `Reverted to Previous Education Filter (${currentType})`,
          {
            variant: "success",
          }
        );
      },
    });
  };

  return (
    <Typography
      variant={isSizeXS ? "subtitle2" : "subtitle1"}
      color="textSecondary"
      className={classes.subtitle}
    >
      <DynamicUnderline
        tooltipLabel={`Filter by '${props.type}'`}
        tooltipLabelEnabled={`Remove '${props.type}' Filter`}
        onClick={onClick}
        onRemove={onRemove}
        enabled={alreadyFiltered}
      >
        <MatchHighlight toMatch={props.search}>{props.type}</MatchHighlight>
      </DynamicUnderline>
    </Typography>
  );
};

export default Title;
