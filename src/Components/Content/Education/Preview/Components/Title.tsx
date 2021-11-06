//React Imports
import React, { FC } from "react";
import { useClosableSnackbar } from "../../../../../Hooks";
import StyledLink from "../../../../Atomic/StyledLink";
import MatchHighlight from "../../../../Atomic/MatchHighlight";
import DynamicUnderline from "../../../../Atomic/DynamicUnderline";
import { ResolvedEducation } from "../../../../../Utils/types";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getEducationTypeFilter,
  setEducationTypeFilter,
} from "../../../../../Redux";
import { useAppDispatch } from "../../../../../Store";

// Material UI Imports
import { Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

interface StyleProps {
  hasProvider: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  title: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign: "center",
    width: "100%",
    marginTop: theme.spacing(1),
    padding: ({ hasProvider }) =>
      hasProvider ? theme.spacing(0, 12) : theme.spacing(0, 2),

    [theme.breakpoints.down("md")]: {
      padding: () => theme.spacing(0, 2),
    },
  },
  subtitle: {
    margin: theme.spacing(1),
    maxHeight: theme.spacing(3.5),

    [theme.breakpoints.down("md")]: {
      marginBottom: 0,
    },
  },
}));

type TitleProps = ResolvedEducation & {
  search?: string;
};

const Title: FC<TitleProps> = (props) => {
  const classes = useStyles({
    hasProvider: !!props.provider,
  });

  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <>
      <StyledLink
        to={`/education/${props.slug}`}
        variant={isSizeXS ? "h5" : "h4"}
        className={classes.title}
        toMatch={props.search}
      >
        {props.title}
      </StyledLink>
      <Subtitle {...props} classes={classes} />
    </>
  );
};

type SubtitleProps = ResolvedEducation & {
  search?: string;
  classes: ReturnType<typeof useStyles>;
};

const Subtitle: FC<SubtitleProps> = (props) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useClosableSnackbar();

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
      variant="body1"
      color="textSecondary"
      className={props.classes.subtitle}
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
