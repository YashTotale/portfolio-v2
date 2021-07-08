// React Imports
import React, { FC } from "react";
import { Document } from "@contentful/rich-text-types";
import RichText from "../../../../Custom/RichText";
import { ResolvedTag } from "../../../../../Utils/types";

// Material UI Imports
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  description: {
    width: "100%",
    padding: theme.spacing(0, 2),
    textAlign: "center",
  },
}));

type DescriptionProps = ResolvedTag & {
  search?: string;
};

const Description: FC<DescriptionProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  if (!props.description) return null;

  return (
    <div className={classes.description}>
      <RichText
        richText={props.description as Document}
        toMatch={props.search}
        variant={isSizeXS ? "body2" : "subtitle1"}
      />
    </div>
  );
};

export default Description;
