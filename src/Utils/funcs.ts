import moment from "moment";

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
    return 1 * multiplier;
  }
  if (a.end && !b.end) {
    return -1 * multiplier;
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
  format: string,
  multiplier: 1 | -1 = 1
): number => {
  const first = moment(a, format);
  const second = moment(b, format);

  const areEqual = first.isSame(second);
  if (areEqual) return 0;

  const isBefore = first.isBefore(second);

  return (isBefore ? 1 : -1) * multiplier;
};
