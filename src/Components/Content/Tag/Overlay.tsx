// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import BaseOverlay from "../../Atomic/Overlay";
import { useTitle } from "../../../Context/HeadContext";
import { generateSearch } from "../../../Utils/funcs";
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

  const location = useLocation();
  const title = useTitle();

  const tag = getTag(props.id);
  if (!tag) return null;

  const icon = isDark ? tag.darkIcon : tag.lightIcon;

  return (
    <BaseOverlay
      to={{
        pathname: `/tags/${tag.slug}`,
        search: generateSearch(
          {
            from_path: location.pathname,
            from_type: "associated",
          },
          title
        ),
      }}
      icon={icon}
      label={tag.title}
      className={props.className}
    />
  );
};

export default Overlay;
