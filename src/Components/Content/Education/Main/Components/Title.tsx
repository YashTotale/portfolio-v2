// React Imports
import React, { FC } from "react";
import Provider from "../../Shared/Provider";
import FloatingIcons from "../../../Shared/FloatingIcons";
import { ResolvedEducation } from "../../../../../Utils/types";

// Material UI Imports
import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Description } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    padding: theme.spacing(0, 18),

    [theme.breakpoints.only("sm")]: {
      padding: theme.spacing(0, 9),
    },

    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(0, 8),
    },
  },
}));

type TitleProps = ResolvedEducation & {
  search?: string;
};

const Title: FC<TitleProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.titleContainer}>
      <Provider {...props} />
      <Typography variant={isSizeSmall ? "h5" : "h4"} align="center">
        {props.title}
      </Typography>
      <Typography
        variant={isSizeSmall ? "subtitle1" : "h6"}
        align="center"
        color="textSecondary"
      >
        {props.type}
      </Typography>
      {!isSizeSmall && (
        <FloatingIcons
          link={props.link}
          github={props.github}
          linkLabel="Website"
          direction="row"
          top={0}
          icons={
            props.certificate && [
              {
                label: "Certificate",
                value: props.certificate.file.url,
                icon: <Description />,
              },
            ]
          }
        />
      )}
    </div>
  );
};

export default Title;
