// React Imports
import React, { cloneElement, FC } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useClosableSnackbar } from "../../../../Hooks";
import Categories from "../Shared/Categories";
import DynamicPaper from "../../../Atomic/DynamicPaper";
import DynamicImage from "../../../Atomic/DynamicImage";
import DynamicUnderline from "../../../Atomic/DynamicUnderline";
import StyledLink from "../../../Atomic/StyledLink";
import HorizontalDivider from "../../../Atomic/Divider/Horizontal";
import { useTitle } from "../../../../Context/HeadContext";
import { generateSearch } from "../../../../Utils/funcs";
import { ResolvedTag, SubType } from "../../../../Utils/types";
import { getTag } from "../../../../Utils/Content/tags";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { getTagsSort, setTagsSort } from "../../../../Redux";
import { TagsSort } from "../../../../Redux/tags.slice";

// Material UI Imports
import { Typography, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import {
  AssignmentTurnedIn,
  Build,
  Description,
  School,
  Work,
} from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 225,

    [theme.breakpoints.only("xs")]: {
      width: "100%",
      flex: "none",
    },
  },
  display: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  iconLink: {
    margin: theme.spacing(3, 2, 2),
  },
  icon: {
    maxWidth: 215,
    height: 150,
  },
  title: {
    margin: theme.spacing(0.5, 1),
    textAlign: "center",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0, 1),
    margin: theme.spacing(1, "auto"),
    flex: 1,
  },
}));

interface RelatedData {
  key: SubType<ResolvedTag, any[]>;
  label?: string;
  sort: TagsSort;
  icon: JSX.Element;
  noPlural?: boolean;
}

const related: RelatedData[] = [
  {
    key: "experience",
    sort: "Most Related Experience",
    icon: <Work />,
  },
  {
    key: "education",
    sort: "Most Related Education",
    icon: <School />,
    noPlural: true,
  },
  {
    key: "projects",
    label: "project",
    sort: "Most Related Projects",
    icon: <Build />,
  },
  {
    key: "articles",
    label: "article",
    sort: "Most Related Articles",
    icon: <Description />,
  },
  {
    key: "certification",
    sort: "Most Related Certifications",
    icon: <AssignmentTurnedIn />,
  },
];

export interface PreviewProps {
  id: string;
  search?: string;
  className?: string;
}

const Preview: FC<PreviewProps> = (props) => {
  const classes = useStyles();

  const theme = useTheme();
  const tag = getTag(props.id);

  const location = useLocation();
  const title = useTitle();

  if (!tag) return null;

  const isDark = theme.palette.mode === "dark";
  const icon = isDark ? tag.darkIcon : tag.lightIcon;

  const generateLink = (type: string) => ({
    pathname: `/tags/${tag.slug}`,
    search: generateSearch(
      {
        from_path: location.pathname,
        from_type: type,
      },
      title
    ),
  });

  return (
    <DynamicPaper className={clsx(classes.container, props.className)}>
      <div className={classes.display}>
        <Link to={generateLink("preview_image")} className={classes.iconLink}>
          <DynamicImage
            src={`${icon.file.url}?h=200`}
            alt={icon.title}
            className={classes.icon}
          />
        </Link>
        <StyledLink
          to={generateLink("preview_title")}
          variant="h5"
          className={classes.title}
          toMatch={props.search}
        >
          {tag.title}
        </StyledLink>
      </div>
      <HorizontalDivider flexItem />
      <div className={classes.info}>
        {related.map((r) => (
          <Related
            key={r.key}
            value={tag[r.key].length}
            label={r.label ?? r.key}
            sort={r.sort}
            icon={r.icon}
            noPlural={r.noPlural}
          />
        ))}
        <Categories {...tag} search={props.search} paddingY={0.5} withClick />
      </div>
    </DynamicPaper>
  );
};

const useRelatedStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(0.5, 0),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  label: {
    maxHeight: theme.spacing(3.5),
  },
}));

interface RelatedProps {
  value: number;
  label: string;
  icon: JSX.Element;
  sort: TagsSort;
  noPlural?: boolean;
}

const Related: FC<RelatedProps> = ({
  value,
  label,
  icon,
  sort,
  noPlural = false,
}) => {
  const dispatch = useDispatch();
  const classes = useRelatedStyles();
  const { enqueueSnackbar } = useClosableSnackbar();

  const tagsSort = useSelector(getTagsSort);
  const alreadySorted = tagsSort === sort;

  const plural = value !== 1;
  const text = (
    <>
      <strong>{value}</strong> related {label}
      {plural && !noPlural ? "s" : ""}
    </>
  );

  const iconToRender = cloneElement(icon, {
    className: classes.icon,
    fontSize: "small",
    color: "disabled",
  });

  const onClick = () => {
    const currentSort = tagsSort;
    dispatch(setTagsSort(sort));
    enqueueSnackbar(`Sorted Tags by '${sort}'`, {
      variant: "success",
      onUndo: () => {
        dispatch(setTagsSort(currentSort));
        enqueueSnackbar(`Reverted to Previous Tags Sort (${currentSort})`, {
          variant: "success",
        });
      },
    });
  };

  return (
    <div className={classes.container}>
      {iconToRender}
      <Typography variant="subtitle1" className={classes.label}>
        <DynamicUnderline
          tooltipLabel={`Sort Tags by '${sort}'`}
          tooltipLabelEnabled={`Currently Sorted by '${sort}'`}
          onClick={onClick}
          enabled={alreadySorted}
        >
          {text}
        </DynamicUnderline>
      </Typography>
    </div>
  );
};

export default Preview;
