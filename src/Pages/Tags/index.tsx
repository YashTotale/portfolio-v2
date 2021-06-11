// React Imports
import React, { FC, useCallback, useMemo } from "react";
import TagPreview from "../../Components/Tag/Preview";
import Filters from "../../Components/Filters";
import { ResolvedTag } from "../../Utils/types";
import { getTag, useSortedTags } from "../../Utils/Content/tags";
import { sortProjects } from "../../Utils/Content/projects";
import {
  generateExperienceTitle,
  sortExperience,
} from "../../Utils/Content/experience";

// Redux Imports
import { useSelector } from "react-redux";
import { getTagsSearch, getTagsSort } from "../../Redux";
import {
  getTagsExperienceFilter,
  getTagsProjectFilter,
  setTagsExperienceFilter,
  setTagsProjectFilter,
  setTagsSearch,
  setTagsSort,
  TagsSort,
  TAGS_SORT,
} from "../../Redux/tags.slice";
import { useAppDispatch } from "../../Store";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "stretch",
  },
  tags: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    flexWrap: "wrap",
    marginLeft: theme.spacing(-2),
  },
  preview: {
    margin: theme.spacing(2),
  },
}));

const Tags: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const allProjects = sortProjects("Alphabetically");
  const allExperience = sortExperience("Alphabetically");

  const search = useSelector(getTagsSearch);
  const sort = useSelector(getTagsSort);
  const projectFilter = useSelector(getTagsProjectFilter);
  const experienceFilter = useSelector(getTagsExperienceFilter);

  return (
    <div className={classes.container}>
      <Filters
        search={{
          defaultSearch: search,
          onSearchChange: (value) => dispatch(setTagsSearch(value)),
        }}
        sort={{
          value: sort,
          values: TAGS_SORT,
          onChange: (value) => dispatch(setTagsSort(value as TagsSort)),
        }}
        related={[
          {
            label: "Projects",
            values: allProjects.map((tag) => tag.title),
            value: projectFilter,
            onChange: (values) => dispatch(setTagsProjectFilter(values)),
          },
          {
            label: "Experience",
            values: allExperience.map(generateExperienceTitle),
            value: experienceFilter,
            onChange: (values) => dispatch(setTagsExperienceFilter(values)),
          },
        ]}
      />
      <Contents />
    </div>
  );
};

const Contents: FC = () => {
  const classes = useStyles();

  const nonResolved = useSortedTags();
  const tags = nonResolved.reduce((arr, t) => {
    const project = getTag(t.id);
    if (project) arr.push(project);
    return arr;
  }, [] as ResolvedTag[]);

  const search = useSelector(getTagsSearch);
  const normalizedSearch = search.toLowerCase();
  const projectFilter = useSelector(getTagsProjectFilter);
  const experienceFilter = useSelector(getTagsExperienceFilter);

  const checkExperienceFilter = useCallback(
    (t: ResolvedTag) => {
      if (!experienceFilter.length) return true;

      return experienceFilter.some((experience) =>
        t.experience.some((exp) => exp.title === experience)
      );
    },
    [experienceFilter]
  );

  const checkProjectFilter = useCallback(
    (t: ResolvedTag) => {
      if (!projectFilter.length) return true;

      return projectFilter.some((project) =>
        t.projects.some((p) => p.title === project)
      );
    },
    [projectFilter]
  );

  const getSearchMatch = useCallback(
    (t: ResolvedTag) => {
      const matches: boolean[] = [
        t.title.toLowerCase().includes(normalizedSearch),
      ];

      return matches;
    },
    [normalizedSearch]
  );

  const filteredTags = useMemo(
    () =>
      tags.reduce((arr, tag) => {
        const experienceFiltered = checkExperienceFilter(tag);
        if (!experienceFiltered) return arr;

        const projectFiltered = checkProjectFilter(tag);
        if (!projectFiltered) return arr;

        if (normalizedSearch.length) {
          const matches = getSearchMatch(tag);
          if (!matches.some((bool) => bool)) return arr;
        }

        return [...arr, tag];
      }, [] as ResolvedTag[]),
    [
      tags,
      normalizedSearch,
      checkExperienceFilter,
      checkProjectFilter,
      getSearchMatch,
    ]
  );

  return (
    <div className={classes.tags}>
      {filteredTags.map((tag) => (
        <TagPreview
          key={tag.id}
          id={tag.id}
          search={search}
          className={classes.preview}
        />
      ))}
    </div>
  );
};

export default Tags;
