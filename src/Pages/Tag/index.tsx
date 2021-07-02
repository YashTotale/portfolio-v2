// React Imports
import React, { FC } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import NotFound from "../NotFound";
import TagMain from "../../Components/Content/Tag/Main";
import TopNav from "../../Components/TopNav";
import NavButton from "../../Components/NavButton";
import { useTitle } from "../../Context/HeadContext";
import {
  generatePageTitle,
  generateSearch,
  getSearch,
} from "../../Utils/funcs";
import { analytics } from "../../Utils/Config/firebase";
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
  buttons: {
    display: "flex",
    width: "100%",
    marginTop: theme.spacing(2),
  },
}));

interface Params {
  slug: string;
}

const Tag: FC = () => {
  const { slug } = useParams<Params>();
  const classes = useStyles();

  const location = useLocation();
  const title = useTitle();
  const search = getSearch(location.search);

  const tag = getTag(slug, true);
  const sortedTags = useSortedTags();

  if (!tag)
    return <NotFound name="tag" redirect="/tags" redirectName="Tags Page" />;

  analytics.logEvent("page_view", {
    page_title: tag.title,
    ...search,
  });

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
        <div className={classes.buttons}>
          {prevTag && (
            <NavButton
              to={{
                pathname: `/tags/${prevTag.slug}`,
                search: generateSearch(
                  {
                    from_path: location.pathname,
                    from_type: "prev_nav_button",
                  },
                  title
                ),
              }}
              label={prevTag.title}
              type="previous"
              typeLabel="Previous Tag"
            />
          )}
          {nextTag && (
            <NavButton
              to={{
                pathname: `/tags/${nextTag.slug}`,
                search: generateSearch(
                  {
                    from_path: location.pathname,
                    from_type: "next_nav_button",
                  },
                  title
                ),
              }}
              label={nextTag.title}
              type="next"
              typeLabel="Next Tag"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Tag;
