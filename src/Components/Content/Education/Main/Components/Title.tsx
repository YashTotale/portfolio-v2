// React Imports
import React, { FC } from "react";
import Provider from "../../Shared/Provider";
import FloatingIcons from "../../../Shared/FloatingIcons";
import { ResolvedEducation } from "../../../../../Utils/types";

// Material UI Imports
import { Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Description } from "@mui/icons-material";

interface StyleProps {
  hasProviderOrLinks: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    padding: ({ hasProviderOrLinks }) =>
      hasProviderOrLinks ? theme.spacing(0, 18) : theme.spacing(0, 2),

    [theme.breakpoints.only("sm")]: {
      padding: ({ hasProviderOrLinks }) =>
        hasProviderOrLinks ? theme.spacing(0, 9) : theme.spacing(0, 2),
    },

    [theme.breakpoints.only("xs")]: {
      padding: () => theme.spacing(0, 2),
    },
  },
}));

type TitleProps = ResolvedEducation & {
  search?: string;
};

const Title: FC<TitleProps> = (props) => {
  const classes = useStyles({
    hasProviderOrLinks:
      !!props.provider || !!(props.link || props.github || props.certificate),
  });
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("md"));
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <div className={classes.titleContainer}>
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
      <Provider {...props} position={isSizeXS ? "static" : "absolute"} />
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
