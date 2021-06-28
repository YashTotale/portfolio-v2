// React Imports
import React, { FC } from "react";
import MatchHighlight from "../../../MatchHighlight";
import { ResolvedTag } from "../../../../Utils/types";

// Material UI Imports
import {
  Link,
  makeStyles,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  TypographyProps,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(1, 0),
  },
}));

type TitleProps = ResolvedTag & {
  search?: string;
};

const Title: FC<TitleProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const sharedProps: Partial<TypographyProps> = {
    variant: isSizeSmall ? "h4" : "h3",
    align: "center",
    className: classes.title,
  };

  return props.link ? (
    <Tooltip title="View Website">
      <Link
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
        {...sharedProps}
      >
        <MatchHighlight toMatch={props.search}>{props.title}</MatchHighlight>
      </Link>
    </Tooltip>
  ) : (
    <Typography {...sharedProps}>
      <MatchHighlight toMatch={props.search}>{props.title}</MatchHighlight>
    </Typography>
  );
};

export default Title;
