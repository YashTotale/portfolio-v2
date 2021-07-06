// React Imports
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import BaseOverlay from "../../Atomic/Overlay";
import { useTitle } from "../../../Context/HeadContext";
import { generateSearch } from "../../../Utils/funcs";
import { getArticle } from "../../../Utils/Content/articles";

interface OverlayProps {
  id: string;
  className?: string;
}

const Overlay: FC<OverlayProps> = (props) => {
  const location = useLocation();
  const title = useTitle();

  const article = getArticle(props.id);
  if (!article) return null;

  return (
    <BaseOverlay
      to={{
        pathname: `/articles/${article.slug}`,
        search: generateSearch(
          {
            from_path: location.pathname,
            from_type: "associated",
          },
          title
        ),
      }}
      icon={article.image}
      label={article.title}
      className={props.className}
    />
  );
};

export default Overlay;
