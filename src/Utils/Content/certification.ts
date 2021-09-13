// Internal Imports
import { getTag } from "./tags";
import { getProvider } from "./providers";
import { Certification, ResolvedCertification, ResolvedTag } from "../types";
import { compareDates, createSorter } from "../funcs";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getCertificationSearch,
  getCertificationSort,
  getCertificationTagFilter,
  getCertificationProviderFilter,
} from "../../Redux";
import { CertificationSort } from "../../Redux/certification.slice";

// Data Imports
import certification from "../../Data/certification.json";

let resolvedCache: ResolvedCertification[] | null = null;

export const getResolvedCertification = (): ResolvedCertification[] => {
  if (resolvedCache) return resolvedCache;

  const raw = Object.values(certification) as Certification[];

  const resolved = raw.reduce((arr, cert) => {
    const provider = getProvider(cert.provider);
    if (!provider) return arr;

    const tags = cert.tags.reduce((arr, tag) => {
      const resolved = getTag(tag);
      if (!resolved) return arr;
      return [...arr, resolved];
    }, [] as ResolvedTag[]);

    const resolved: ResolvedCertification = { ...cert, provider, tags };

    return [...arr, resolved];
  }, [] as ResolvedCertification[]);

  resolvedCache = resolved;
  return resolved;
};

export const checkTags = (
  c: ResolvedCertification,
  tags: string[]
): boolean => {
  if (!tags.length) return true;
  return tags.some((tag) => c.tags.some((t) => t.title === tag));
};

export const checkProviders = (
  c: ResolvedCertification,
  providers: string[]
): boolean => {
  if (!providers.length) return true;
  return providers.some((provider) => c.provider.title === provider);
};

const searchCache: Record<string, Record<string, boolean>> = {};

export const checkSearch = (
  c: ResolvedCertification,
  search: string
): boolean => {
  if (!search.length) return true;
  if (!searchCache[c.id]) searchCache[c.id] = {};

  const cache = searchCache[c.id][search];
  if (typeof cache === "boolean") return cache;

  const matches: (boolean | undefined)[] = [
    c.title.toLowerCase().includes(search),
    c.date.toLowerCase().includes(search),
    c.provider.title.toLowerCase().includes(search),
    c.tags.some((tag) => tag.title.toLowerCase().includes(search)),
  ];

  const result = matches.includes(true);
  searchCache[c.id][search] = result;
  return result;
};

export const useFilteredCertification = (): ResolvedCertification[] => {
  const certification = useSortedCertification();

  const search = useSelector(getCertificationSearch);
  const normalizedSearch = search.toLowerCase();
  const tagFilter = useSelector(getCertificationTagFilter);
  const providerFilter = useSelector(getCertificationProviderFilter);

  return certification.filter((e) => {
    if (!checkTags(e, tagFilter)) return false;
    if (!checkProviders(e, providerFilter)) return false;
    if (!checkSearch(e, normalizedSearch)) return false;

    return true;
  });
};

export const useSortedCertification = (): ResolvedCertification[] => {
  const sort = useSelector(getCertificationSort);
  return sortCertification(sort);
};

const sortCertification = createSorter<
  CertificationSort,
  ResolvedCertification
>(
  {
    Latest: (a, b) =>
      compareDates(a.date, b.date, ["MMM YYYY", "MMM DD, YYYY"]),
    Earliest: (a, b) =>
      compareDates(a.date, b.date, ["MMM YYYY", "MMM DD, YYYY"], -1),
    Alphabetically: (a, b) => a.title.localeCompare(b.title),
  },
  getResolvedCertification()
);
