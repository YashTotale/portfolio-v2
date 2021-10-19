// React Imports
import React, { forwardRef } from "react";
import clsx from "clsx";
import { Document } from "@contentful/rich-text-types";
import Title from "./Components/Title";
import Footer from "./Components/Footer";
import Provider from "../Shared/Provider";
import DynamicPaper from "../../../Atomic/DynamicPaper";
import RichText from "../../../Custom/RichText";
import TagMini from "../../Tag/Mini";
import HorizontalDivider from "../../../Atomic/Divider/Horizontal";
import { getSingleEducation } from "../../../../Utils/Content/education";

// Material UI Imports
import { useMediaQuery, useTheme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2, 0),
    width: "100%",
  },
  display: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
    borderBottom: `1px solid ${theme.palette.text.disabled}`,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(1, 2),
  },
  description: {
    width: "100%",
    textAlign: "center",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1, 2),
  },
}));

export interface PreviewProps {
  id: string;
  search?: string;
  className?: string;
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>((props, ref) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSizeSmall = useMediaQuery(theme.breakpoints.down("md"));
  const isSizeXS = useMediaQuery(theme.breakpoints.only("xs"));

  const education = getSingleEducation(props.id);
  if (!education) return null;

  return (
    <DynamicPaper
      ref={ref}
      className={clsx(classes.container, props.className)}
    >
      <div className={classes.display}>
        <Title {...education} search={props.search} />
        <Provider
          {...education}
          position={isSizeSmall ? "static" : "absolute"}
        />
      </div>
      <div className={classes.info}>
        <div className={classes.description}>
          <RichText
            richText={education.description as Document}
            toMatch={props.search}
            variant={isSizeXS ? "body2" : "body1"}
          />
        </div>
      </div>
      {education.tags.length && (
        <>
          <div className={classes.tags}>
            {education.tags.map((tag) => (
              <TagMini key={tag.id} id={tag.id} search={props.search} />
            ))}
          </div>
        </>
      )}
      <HorizontalDivider />
      <Footer {...education} search={props.search} />
    </DynamicPaper>
  );
});

export default Preview;
