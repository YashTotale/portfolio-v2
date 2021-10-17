// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import DynamicPaper from "../../../Atomic/DynamicPaper";
import Overlay from "../../../Atomic/Overlay";
import HorizontalDivider from "../../../Atomic/Divider/Horizontal";
import { useTitle } from "../../../../Context/HeadContext";
import { generateSearch } from "../../../../Utils/funcs";
import { useSortedTags } from "../../../../Utils/Content/tags";

// Material UI Imports
import { Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

interface StyleProps {
  iconWidth: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    margin: theme.spacing(0.5),
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.5rem",
    },
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: theme.spacing(2),
  },
  tag: {
    margin: theme.spacing(1),
  },
  empty: {
    flexGrow: 1,
  },
}));

interface CategoryProps {
  category: string;
  className?: string;
}

const Category: FC<CategoryProps> = (props) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("md"));

  const iconWidth = isSizeSmall ? 50 : 75;

  const classes = useStyles({
    iconWidth,
  });

  const location = useLocation();
  const title = useTitle();

  const tags = useSortedTags(true);

  const included = tags.filter((tag) =>
    tag.categories?.includes(props.category)
  );

  if (!included.length) return null;

  return (
    <DynamicPaper className={clsx(classes.container, props.className)}>
      <Typography variant="h6" className={classes.title}>
        {props.category}
      </Typography>
      <HorizontalDivider />
      <div className={classes.tags}>
        {included.map((tag) => {
          const icon = isDark ? tag.darkIcon : tag.lightIcon;
          return (
            <Overlay
              key={tag.id}
              to={{
                pathname: `/tags/${tag.slug}`,
                search: generateSearch(
                  {
                    from_path: location.pathname,
                    from_title: "home_skill_set",
                  },
                  title
                ),
              }}
              icon={icon}
              size="small"
              label={tag.title}
              className={classes.tag}
            />
          );
        })}
      </div>
      <span className={classes.empty} />
    </DynamicPaper>
  );
};

export default Category;
