// React Imports
import React, { FC, Fragment } from "react";
import Fuse from "fuse.js";

interface MatchHighlightProps {
  matches?: readonly Fuse.FuseResultMatch[];
  indexOffset?: number;
  children: string;
  keyToMatch: string;
}

const MatchHighlight: FC<MatchHighlightProps> = ({
  matches,
  keyToMatch,
  children,
  indexOffset = 0,
}) => {
  if (!matches) return <>{children}</>;

  const keyMatch = matches.find((match) => match.key === keyToMatch);

  if (!keyMatch) return <>{children}</>;

  const parsed: (JSX.Element | string)[] = [];

  for (let i = 0; i < children.length; i++) {
    const isMarked = keyMatch.indices?.find(
      (index) => index[0] === i + indexOffset
    );

    if (!isMarked) {
      const char = children.substring(i, i + 1);
      const lastElement = parsed[parsed.length - 1];

      if (typeof lastElement === "string") {
        parsed[parsed.length - 1] = parsed[parsed.length - 1] + char;
      } else {
        parsed.push(char);
      }

      continue;
    }

    parsed.push(
      <mark>
        {children.substring(
          isMarked[0] - indexOffset,
          isMarked[1] - indexOffset + 1
        )}
      </mark>
    );
    i += isMarked[1] - isMarked[0];
  }

  console.log(parsed);

  return (
    <>
      {parsed.map((el, i) => (
        <Fragment key={i}>{el}</Fragment>
      ))}
    </>
  );
};

export default MatchHighlight;
