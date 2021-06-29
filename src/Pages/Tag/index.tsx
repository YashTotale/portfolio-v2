// React Imports
import React, { FC } from "react";
import { useParams } from "react-router";
import NotFound from "../NotFound";
import TagMain from "../../Components/Content/Tag/Main";
import NavButton from "../../Components/NavButton";
import { getTag, useSortedTags } from "../../Utils/Content/tags";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  tag: {
    margin: theme.spacing(1, 0),
  },
  topButtons: {
    display: "flex",
    width: "100%",
  },
  allTags: {
    maxWidth: "25%",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "45%",
    },
  },
  buttons: {
    display: "flex",
    width: "100%",
    margin: theme.spacing(2, 0, 4),
  },
}));

interface Params {
  slug: string;
}

const Tag: FC = () => {
  const { slug } = useParams<Params>();
  const classes = useStyles();
  const tag = getTag(slug, true);
  const sortedTags = useSortedTags();

  if (!tag)
    return <NotFound name="tag" redirect="/tags" redirectName="Tags Page" />;

  const tagIndex = sortedTags.findIndex((t) => t.id === tag.id);
  const prevTag = sortedTags[tagIndex - 1];
  const nextTag = sortedTags[tagIndex + 1];

  return (
    <div className={classes.container}>
      <div className={classes.topButtons}>
        <NavButton
          to="/tags"
          label="All Tags"
          type="next"
          typeLabel=""
          className={classes.allTags}
        />
      </div>
      <TagMain id={tag.id} className={classes.tag} />
      <div className={classes.buttons}>
        {prevTag && (
          <NavButton
            to={`/tags/${prevTag.slug}`}
            label={prevTag.title}
            type="previous"
            typeLabel="Previous Tag"
          />
        )}
        {nextTag && (
          <NavButton
            to={`/tags/${nextTag.slug}`}
            label={nextTag.title}
            type="next"
            typeLabel="Next Tag"
          />
        )}
      </div>
    </div>
  );
};

export default Tag;
