// React Imports
import React, { FC } from "react";
import Overlay from "../../../Overlay";
import { getTag } from "../../../../Utils/Content/tags";

// Material UI Imports
import { useTheme } from "@material-ui/core";

export interface AssociatedProps {
  id: string;
  className?: string;
}

const Associated: FC<AssociatedProps> = (props) => {
  const theme = useTheme();
  const isDark = theme.palette.type === "dark";

  const tag = getTag(props.id);
  if (!tag) return null;

  const icon = isDark ? tag.darkIcon : tag.lightIcon;

  return (
    <Overlay
      to={`/tags/${tag.slug}`}
      icon={icon}
      label={tag.title}
      className={props.className}
    />
  );
};

export default Associated;
