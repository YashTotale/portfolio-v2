// React Imports
import React, { FC } from "react";
import NavButton from "./NavButton";

// Material UI Imports
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  bottomNav: {
    display: "flex",
    width: "100%",
    marginTop: theme.spacing(2),
  },
}));

interface Content {
  title: string;
  slug: string;
}

interface BottomNavProps {
  pathFunc: (slug: string) => string;
  label: string;
  prevContent?: Content;
  nextContent?: Content;
}

const BottomNav: FC<BottomNavProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.bottomNav}>
      {props.prevContent && (
        <NavButton
          to={props.pathFunc(props.prevContent.slug)}
          label={props.prevContent.title}
          type="previous"
          typeLabel={`Previous ${props.label}`}
        />
      )}
      {props.nextContent && (
        <NavButton
          to={props.pathFunc(props.nextContent.slug)}
          label={props.nextContent.title}
          type="next"
          typeLabel={`Next ${props.label}`}
        />
      )}
    </div>
  );
};

export default BottomNav;
