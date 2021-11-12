// React Imports
import React, { FC } from "react";
import BaseOverlay from "../../Atomic/Overlay";
import { Paths } from "../../Static/NavController";
import { getTag } from "../../../Utils/Content/tags";

// Material UI Imports
import { useTheme } from "@mui/material";

interface OverlayProps {
  id: string;
  className?: string;
}

const Overlay: FC<OverlayProps> = (props) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const tag = getTag(props.id);
  if (!tag) return null;

  const icon = isDark ? tag.darkIcon : tag.lightIcon;

  return (
    <BaseOverlay
      to={Paths.Tag(tag.slug)}
      icon={icon}
      label={tag.title}
      className={props.className}
    />
  );
};

export default Overlay;
