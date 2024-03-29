// External Imports
import moment from "moment";

// Internal Imports
import { EnqueueSnackbar } from "../Hooks/useClosableSnackbar";

export const chunk = <T extends unknown>(arr: T[], size: number): T[][] => {
  const newArr = [];

  for (let i = 0; i < arr.length; i += size) {
    newArr.push(arr.slice(i, i + size));
  }

  return newArr;
};

interface DateObject {
  start: string;
  end?: string;
}

export const sortByDate = (
  a: DateObject,
  b: DateObject,
  multiplier: 1 | -1 = 1
): number => {
  const format = "MMMM YYYY";

  if (!a.end && b.end) {
    return -1 * multiplier;
  }
  if (a.end && !b.end) {
    return 1 * multiplier;
  }

  if (a.end && b.end) {
    const compare = compareDates(a.end, b.end, format, multiplier);
    if (compare !== 0) return compare;
  }

  return compareDates(a.start, b.start, format, multiplier);
};

export const compareDates = (
  a: string,
  b: string,
  format: string | string[],
  multiplier: 1 | -1 = 1
): number => {
  const first = moment(a, format);
  const second = moment(b, format);

  const areEqual = first.isSame(second);
  if (areEqual) return 0;

  const isBefore = first.isBefore(second);

  return (isBefore ? 1 : -1) * multiplier;
};

type Sorter<T> = (a: T, b: T) => number;

export const createSorter = <K extends string, T>(
  sortFuncs: Record<K, Sorter<T>>,
  all: T[]
): ((sort: K) => T[]) => {
  // Initialize cache with null values
  const sortCache = Object.keys(sortFuncs).reduce(
    (clone, key) => ({ [key]: null, ...clone }),
    {} as Record<K, null | T[]>
  );

  return (sort: K): T[] => {
    if (sortCache[sort]) return sortCache[sort] as T[];

    const sorted = sortFuncs[sort] ? [...all].sort(sortFuncs[sort]) : all;
    sortCache[sort] = sorted;

    return sorted;
  };
};

type Resolver<T> = (id: string, isSlug?: boolean) => T | null;

export const createResolver = <T>(resolveFunc: Resolver<T>): Resolver<T> => {
  const resolveCache: Record<string, T | null> = {};

  return (id: string, isSlug = false) => {
    if (resolveCache[id]) return resolveCache[id];

    const resolved = resolveFunc(id, isSlug);
    resolveCache[id] = resolved;

    return resolved;
  };
};

const toAppend = " — Yash Totale";

export const generatePageTitle = (t: string): string => `${t}${toAppend}`;

export const getPageTitle = (rawTitle: string): string => {
  return rawTitle.replace(toAppend, "");
};

export const scrollToTop = (behavior: ScrollBehavior = "smooth"): void => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior,
  });
};

export const enqueueError = (
  e: Error | string,
  enqueueSnackbar: EnqueueSnackbar
): void => {
  const message = typeof e === "string" ? e : e.message;
  enqueueSnackbar(message || "An error occurred. Please try again.", {
    variant: "error",
  });
};
