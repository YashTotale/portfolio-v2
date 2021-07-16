// React Imports
import React, { FC } from "react";
import { Document } from "@contentful/rich-text-types";
import ButtonLinks from "../../../Shared/ButtonLinks";
import RichText from "../../../../Custom/RichText";
import { ResolvedEducation } from "../../../../../Utils/types";

// Material UI Imports
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import { Description as DescriptionIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  description: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    padding: theme.spacing(1, 2),
  },
}));

type DescriptionProps = ResolvedEducation & {
  search?: string;
};

const Description: FC<DescriptionProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <div className={classes.description}>
      <RichText
        richText={props.description as Document}
        toMatch={props.search}
        variant={isSizeXS ? "body2" : "body1"}
      />
      <ButtonLinks
        link={props.link}
        github={props.github}
        buttons={
          props.certificate && [
            {
              label: "Certificate",
              value: props.certificate.file.url,
              icon: <DescriptionIcon />,
            },
          ]
        }
      />
    </div>
  );
};

export default Description;
