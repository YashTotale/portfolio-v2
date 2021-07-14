// React Imports
import React, { FC } from "react";
import { Document } from "@contentful/rich-text-types";
import ButtonLinks from "../../Shared/ButtonLinks";
import RichText from "../../../Custom/RichText";
import DynamicImage from "../../../Atomic/DynamicImage";
import { ResolvedProject } from "../../../../Utils/types";

// Material UI Imports
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  projectInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(1),

    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-between",
    },

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  projectImage: {
    margin: theme.spacing(2),

    [theme.breakpoints.only("xl")]: {
      width: 225,
    },

    [theme.breakpoints.only("lg")]: {
      width: 200,
    },

    [theme.breakpoints.only("md")]: {
      width: 175,
    },

    [theme.breakpoints.only("sm")]: {
      width: 150,
    },

    [theme.breakpoints.only("xs")]: {
      width: 125,
    },
  },
  projectDescription: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 1,

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      alignItems: "center",
    },
  },
}));

const Display: FC<ResolvedProject> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.projectInfo}>
      <DynamicImage
        src={`${props.image.file.url}?w=225`}
        alt={props.image.title}
        className={classes.projectImage}
      />
      <div className={classes.projectDescription}>
        <RichText
          variant={isSizeSmall ? "body2" : "body1"}
          richText={props.description as Document}
        />
      </div>
      <ButtonLinks
        link={props.link}
        linkLabel="Project"
        github={props.github}
      />
    </div>
  );
};

export default Display;
