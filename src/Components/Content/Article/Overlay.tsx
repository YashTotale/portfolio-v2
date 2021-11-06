// React Imports
import React, { FC } from "react";
import BaseOverlay from "../../Atomic/Overlay";
import { getArticle } from "../../../Utils/Content/articles";

interface OverlayProps {
  id: string;
  className?: string;
}

const Overlay: FC<OverlayProps> = (props) => {
  const article = getArticle(props.id);
  if (!article) return null;

  return (
    <BaseOverlay
      to={`/articles/${article.slug}`}
      icon={article.image}
      label={article.title}
      className={props.className}
    />
  );
};

export default Overlay;
