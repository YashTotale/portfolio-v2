// React Imports
import React, { FC } from "react";
import DynamicImage from "../../../Atomic/DynamicImage";
import { ResolvedEducation } from "../../../../Utils/types";
import { getAsset } from "../../../../Utils/Content/assets";

// Material UI Imports
import { Link, Theme, Tooltip } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Properties } from "csstype";

interface StyleProps {
  position: Properties["position"];
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  provider: {
    display: "flex",
    justifyContent: "stretch",
    alignItems: "stretch",
    position: ({ position }) => position,
    left: ({ position }) =>
      position === "absolute" ? theme.spacing(1) : "auto",
    maxWidth: 65,
    maxHeight: 65,
    padding: theme.spacing(1),

    [theme.breakpoints.only("sm")]: {
      maxWidth: 55,
      maxHeight: 55,
    },

    [theme.breakpoints.only("xs")]: {
      maxWidth: 40,
      maxHeight: 40,
      padding: theme.spacing(0.5),
    },
  },
  providerImage: {
    width: "100%",
    height: "100%",
  },
}));

type ProviderProps = ResolvedEducation & {
  position?: Properties["position"];
};

const Provider: FC<ProviderProps> = (props) => {
  const classes = useStyles({
    position: props.position ?? "absolute",
  });

  if (!props.provider) return null;

  const title = `Provided by ${props.provider.title}`;

  const providerImage = (
    <DynamicImage
      src={`${getAsset(props.provider.image).file.url}?w=80`}
      alt={props.provider.title}
      className={classes.providerImage}
    />
  );

  if (props.provider.link)
    return (
      <div className={classes.provider}>
        <Tooltip title={title}>
          <Link
            href={props.provider.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {providerImage}
          </Link>
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
