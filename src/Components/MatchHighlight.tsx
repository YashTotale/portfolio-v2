// React Imports
import React, { FC, Fragment } from "react";

interface MatchHighlightProps {
  toMatch?: string;
  children: string;
}

const MatchHighlight: FC<MatchHighlightProps> = ({
  toMatch = "",
  children,
}) => {
  if (!toMatch.length) return <>{children}</>;

  const normalizedChildren = children.toLowerCase();
  const normalizedMatch = toMatch.toLowerCase();

  const parsed: (JSX.Element | string)[] = [];

  let fromIndex = 0;
  let index = 0;

  while (normalizedChildren.indexOf(normalizedMatch, fromIndex) !== -1) {
    index = normalizedChildren.indexOf(normalizedMatch, fromIndex);
    parsed.push(children.substring(fromIndex, index));
    parsed.push(
      <mark>{children.substring(index, index + toMatch.length)}</mark>
    );
    fromIndex = index + toMatch.length;
  }

  parsed.push(children.substring(fromIndex));

  return (
    <>
      {parsed.map((el, i) => (
        <Fragment key={i}>{el}</Fragment>
      ))}
    </>
  );
};

export default MatchHighlight;
