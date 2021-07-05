// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import NavButton from "./NavButton";
import { useTitle } from "../../../Context/HeadContext";
import { generateSearch } from "../../../Utils/funcs";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

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
  basePath: string;
  label: string;
  prevContent?: Content;
  nextContent?: Content;
}

const BottomNav: FC<BottomNavProps> = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const title = useTitle();

  return (
    <div className={classes.bottomNav}>
      {props.prevContent && (
        <NavButton
          to={{
            pathname: `/${props.basePath}/${props.prevContent.slug}`,
            search: generateSearch(
              {
                from_path: location.pathname,
                from_type: "prev_nav_button",
              },
              title
            ),
          }}
          label={props.prevContent.title}
          type="previous"
          typeLabel={`Previous ${props.label}`}
        />
      )}
      {props.nextContent && (
        <NavButton
          to={{
            pathname: `/${props.basePath}/${props.nextContent.slug}`,
            search: generateSearch(
              {
                from_path: location.pathname,
                from_type: "next_nav_button",
              },
              title
            ),
          }}
          label={props.nextContent.title}
          type="next"
          typeLabel={`Next ${props.label}`}
        />
      )}
    </div>
  );
};

export default BottomNav;
