// React Imports
import React, { FC } from "react";
import DynamicImage from "../../../Atomic/DynamicImage";
import { ResolvedEducation } from "../../../../Utils/types";

// Material UI Imports
import { makeStyles, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  provider: {
    display: "flex",
    justifyContent: "stretch",
    alignItems: "stretch",
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(1),
    maxWidth: 65,
    maxHeight: 65,

    [theme.breakpoints.only("xs")]: {
      maxWidth: 45,
      maxHeight: 45,
    },
  },
  providerImage: {
    width: "100%",
    height: "100%",
  },
}));

type ProviderProps = ResolvedEducation;

const Provider: FC<ProviderProps> = (props) => {
  const classes = useStyles();

  if (!props.provider || !props.providerImage) return null;

  const title = `Provided by ${props.provider}`;

  const providerImage = (
    <DynamicImage
      src={`${props.providerImage.file.url}?w=80`}
      alt={props.provider}
      className={classes.providerImage}
    />
  );

  if (props.providerLink)
    return (
      <div className={classes.provider}>
        <Tooltip title={title}>
          <a
            href={props.providerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {providerImage}
          </a>
        </Tooltip>
      </div>
    );

  return (
    <div className={classes.provider}>
      <Tooltip title={title}>{providerImage}</Tooltip>
    </div>
  );
};

export default Provider;
