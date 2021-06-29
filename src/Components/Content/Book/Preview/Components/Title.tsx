// React Imports
import React, { FC } from "react";
import MatchHighlight from "../../../../MatchHighlight";
import { Book } from "../../../../../Utils/types";

// Material UI Imports
import { Link, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(0.5, 1),
    lineHeight: 1.3,
  },
}));

type TitleProps = Book & {
  search?: string;
};

const Title: FC<TitleProps> = (props) => {
  const classes = useStyles();

  return (
    <Typography variant="h6" align="center" className={classes.title}>
      <Link href={props.link} target="_blank" rel="noopener noreferrer">
        <MatchHighlight toMatch={props.search}>{props.title}</MatchHighlight>
      </Link>
    </Typography>
  );
};

export default Title;
