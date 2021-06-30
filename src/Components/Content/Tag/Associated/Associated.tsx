// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import Overlay from "../../../Overlay";
import { generateSearch } from "../../../../Utils/funcs";
import { getTag } from "../../../../Utils/Content/tags";

// Material UI Imports
import { useTheme } from "@material-ui/core";

export interface AssociatedProps {
  id: string;
  className?: string;
}

const Associated: FC<AssociatedProps> = (props) => {
  const theme = useTheme();
  const location = useLocation();
  const isDark = theme.palette.type === "dark";

  const tag = getTag(props.id);
  if (!tag) return null;

  const icon = isDark ? tag.darkIcon : tag.lightIcon;

  return (
    <Overlay
      to={{
        pathname: `/tags/${tag.slug}`,
        search: generateSearch({
          from_path: location.pathname,
          from_type: "associated",
        }),
      }}
      icon={icon}
      label={tag.title}
      className={props.className}
    />
  );
};

export default Associated;