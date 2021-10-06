// Internal Imports
import { getRawTag } from "./tags";
import { getProvider } from "./providers";
import { Certification, ResolvedCertification, Tag } from "../types";
import { compareDates, createResolver, createSorter } from "../funcs";

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

export const getCertification = (): Certification[] => {
  return Object.values(certification);
};

export const getRawCertification = (
  identifier: string
): Certification | null => {
  const all = certification as Record<string, Certification>;
  const single = all[identifier];

  if (!single) return null;
  return single;
};

export const getSingleCertification = createResolver((id: string) => {
  const cert = getRawCertification(id);
  if (!cert) return null;

  const provider = getProvider(cert.provider);
  if (!provider) return null;

  const tags = cert.tags.reduce((arr, tag) => {
    const resolved = getRawTag(tag);
    if (!resolved) return arr;
    return [...arr, resolved];
  }, [] as Tag[]);

  const resolved: ResolvedCertification = { ...cert, provider, tags };

  return resolved;
});

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
  const certification = useSortedCertification(true);

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

export function useSortedCertification(resolve: true): ResolvedCertification[];
export function useSortedCertification(resolve: false): Certification[];
export function useSortedCertification(): Certification[];
export function useSortedCertification(
  resolve?: boolean
): (ResolvedCertification | Certification)[] {
  const sort = useSelector(getCertificationSort);
  const sorted = sortCertification(sort);
  if (!resolve) return sorted;

  return sorted.reduce((arr, e) => {
    const cert = getSingleCertification(e.id);
    if (cert) arr.push(cert);
    return arr;
  }, [] as ResolvedCertification[]);
}

export const sortCertification = createSorter<CertificationSort, Certification>(
  {
    Newest: (a, b) =>
      compareDates(a.date, b.date, ["MMM YYYY", "MMM DD, YYYY"]),
    Alphabetically: (a, b) => a.title.localeCompare(b.title),
  },
  getCertification()
);
