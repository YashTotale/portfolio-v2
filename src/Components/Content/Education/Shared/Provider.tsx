// React Imports
import React, { FC } from "react";
import DynamicImage from "../../../Atomic/DynamicImage";
import { ResolvedEducation } from "../../../../Utils/types";
import { getAsset } from "../../../../Utils/Content/assets";

// Material UI Imports
import { Link, makeStyles, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  provider: {
    display: "flex",
    justifyContent: "stretch",
    alignItems: "stretch",
    position: "absolute",
    left: theme.spacing(1),
    maxWidth: 65,
    maxHeight: 65,
    padding: theme.spacing(1),

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
