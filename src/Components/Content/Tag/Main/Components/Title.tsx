// React Imports
import React, { FC } from "react";
import FloatingIcons from "../../../Shared/FloatingIcons";
import MatchHighlight from "../../../../Atomic/MatchHighlight";
import { ResolvedTag } from "../../../../../Utils/types";

// Material UI Imports
import {
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

interface StyleProps {
  hasLink: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    padding: ({ hasLink }) => (hasLink ? theme.spacing(0, 6) : 0),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
}));

type TitleProps = ResolvedTag & {
  search?: string;
};

const Title: FC<TitleProps> = (props) => {
  const classes = useStyles({
    hasLink: !!props.link,
  });
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.titleContainer}>
      <Typography
        variant={isSizeSmall ? "h5" : "h4"}
        align="center"
        className={classes.title}
      >
        <MatchHighlight toMatch={props.search}>{props.title}</MatchHighlight>
      </Typography>
      {props.link && (
        <FloatingIcons
          link={props.link}
          linkLabel="Website"
          direction="row"
          top={0}
        />
      )}
    </div>
  );
};

export default Title;
