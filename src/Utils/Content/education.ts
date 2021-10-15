// External Imports
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";

// Internal Imports
import { createResolver, createSorter, sortByDate } from "../funcs";
import { Education, ResolvedEducation, SubType, Tag } from "../types";
import { getDefaultSortedEducation } from "./main";
import { getRawTag } from "./tags";
import { getRawProvider } from "./providers";
import { getAsset } from "./assets";

// Redux Imports
import { useSelector } from "react-redux";
import {
  EducationState,
  getEducationSearch,
  getEducationSort,
  getEducationTagFilter,
  getEducationTypeFilter,
  getEducationProviderFilter,
} from "../../Redux";
import { EducationSort } from "../../Redux/education.slice";

// Data Imports
import education from "../../Data/education.json";

export const getEducation = (): Education[] => {
  return (Object.values(education) as unknown) as Education[];
};

export const getSingleEducation = createResolver(
  (id: string, isSlug = false): ResolvedEducation | null => {
    const single = getRawEducation(id, isSlug);
    if (!single) return null;

    const provider = getRawProvider(single.provider ?? "") ?? undefined;
    const certificate = getAsset(single.certificate ?? "") ?? undefined;

    const tags = single.tags.reduce((arr, tag) => {
      const resolved = getRawTag(tag);
      if (resolved) arr.push(resolved);
      return arr;
    }, [] as Tag[]);

    return { ...single, provider, certificate, tags };
  }
);

export const getRawEducation = (
  identifier: string,
  isSlug = false
): Education | null => {
  const all = (education as unknown) as Record<string, Education>;
  const single = !isSlug
    ? all[identifier]
    : Object.values(all).find((e) => e.slug === identifier);

  if (!single) return null;
  return single;
};

interface EdType {
  label: string;
  amount: number;
}

let typesCache: EdType[] | null = null;

export const getEducationTypes = (): EdType[] => {
  if (typesCache) return typesCache;

  const education = getEducation();

  const types = education.reduce((types, ed) => {
    const exists = types.find((t) => t.label === ed.type);

    if (exists) {
      exists.amount++;
      return types;
    }

    return [
      ...types,
      {
        label: ed.type,
        amount: 1,
      },
    ];
  }, [] as EdType[]);

  const unique = types.sort((a, b) => a.label.localeCompare(b.label));
  typesCache = unique;
  return unique;
};

export const generateEducationTimeline = (
  ed: Education | ResolvedEducation
): string => {
  const start = ed.start;
  let end = ed.end;

  if (end === start) return start;

  if (!end) end = "Present";
  return `${start} - ${end}`;
};

export const checkTags = (e: ResolvedEducation, tags: string[]): boolean => {
  if (!tags.length) return true;
  return tags.every((tag) => e.tags.some((t) => t.title === tag));
};

export const checkType = (
  e: ResolvedEducation,
  type: EducationState["typeFilter"]
): boolean => {
  if (type === null) return true;
  return type === e.type;
};

export const checkProvider = (
  c: ResolvedEducation,
  provider: EducationState["providerFilter"]
): boolean => {
  if (provider === null) return true;
  return provider === c.provider?.title;
};

const searchCache: Record<string, Record<string, boolean>> = {};

export const checkSearch = (e: ResolvedEducation, search: string): boolean => {
  if (!search.length) return true;
  if (!searchCache[e.id]) searchCache[e.id] = {};

  const cache = searchCache[e.id][search];
  if (typeof cache === "boolean") return cache;

  const matches: (boolean | undefined)[] = [
    e.title.toLowerCase().includes(search),
    e.type.toLowerCase().includes(search),
    documentToPlainTextString(e.description as Document).includes(search),
    generateEducationTimeline(e).toLowerCase().includes(search),
    e.tags.some((tag) => tag.title.toLowerCase().includes(search)),
  ];

  const result = matches.includes(true);
  searchCache[e.id][search] = result;
  return result;
};

export const useFilteredEducation = (): ResolvedEducation[] => {
  const education = useSortedEducation(true);

  const search = useSelector(getEducationSearch);
  const normalizedSearch = search.toLowerCase();
  const tagFilter = useSelector(getEducationTagFilter);
  const typeFilter = useSelector(getEducationTypeFilter);
  const providerFilter = useSelector(getEducationProviderFilter);

  return education.filter((e) => {
    if (!checkTags(e, tagFilter)) return false;
    if (!checkType(e, typeFilter)) return false;
    if (!checkProvider(e, providerFilter)) return false;
    if (!checkSearch(e, normalizedSearch)) return false;

    return true;
  });
};

export function useSortedEducation(resolve: true): ResolvedEducation[];
export function useSortedEducation(resolve: false): Education[];
export function useSortedEducation(): Education[];
export function useSortedEducation(
  resolve?: boolean
): (ResolvedEducation | Education)[] {
  const sort = useSelector(getEducationSort);
  const sorted = sortEducation(sort);
  if (!resolve) return sorted;

  return sorted.reduce((arr, e) => {
    const ed = getSingleEducation(e.id);
    if (ed) arr.push(ed);
    return arr;
  }, [] as ResolvedEducation[]);
}

export const sortEducation = createSorter<EducationSort, Education>(
  {
    Default: (a, b) => {
      const sorted = getDefaultSortedEducation();
      const aIndex = sorted.indexOf(a.id);
      const bIndex = sorted.indexOf(b.id);

      return aIndex - bIndex;
    },
    Alphabetically: (a, b) => a.title.localeCompare(b.title),
    Latest: (a, b) => sortByDate(a, b),
  },
  getEducation()
);

interface RelatedEducation {
  label: string;
  amount: number;
}

const relatedCache: Record<any, RelatedEducation[]> = {};

export const getEducationAsRelated = (
  key: SubType<Education, any[]>
): RelatedEducation[] => {
  if (relatedCache[key]) return relatedCache[key];

  const allEducation = sortEducation("Alphabetically");
  const related = allEducation.map((ed) => ({
    label: ed.title,
    amount: ed[key].length,
  }));

  relatedCache[key] = related;
  return related;
};
