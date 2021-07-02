// React Imports
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAnalytics } from "../../Hooks";
import NotFound from "../NotFound";
import TagMain from "../../Components/Content/Tag/Main";
import TopNav from "../../Components/Navigation/TopNav";
import BottomNav from "../../Components/Navigation/BottomNav";
import { generatePageTitle } from "../../Utils/funcs";
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
}));

interface Params {
  slug: string;
}

const Tag: FC = () => {
  const { slug } = useParams<Params>();
  const classes = useStyles();

  const tag = getTag(slug, true);
  const sortedTags = useSortedTags();

  useAnalytics(tag?.title);

  if (!tag)
    return <NotFound name="tag" redirect="/tags" redirectName="Tags Page" />;

  const tagIndex = sortedTags.findIndex((t) => t.id === tag.id);
  const prevTag = sortedTags[tagIndex - 1];
  const nextTag = sortedTags[tagIndex + 1];

  return (
    <>
      <Helmet>
        <title>{generatePageTitle(tag.title)}</title>
      </Helmet>
      <div className={classes.container}>
        <TopNav allPath="tags" allLabel="Tags" />
        <TagMain id={tag.id} className={classes.tag} />
        <BottomNav
          basePath="tags"
          label="Tag"
          prevContent={prevTag}
          nextContent={nextTag}
        />
      </div>
    </>
  );
};

export default Tag;
