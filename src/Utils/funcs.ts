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
  multiplier: number
): number => {
  if (!a.end && b.end) {
    return 1 * multiplier;
  }
  if (a.end && !b.end) {
    return -1 * multiplier;
  }

  if (a.end && b.end) {
    const firstEnd = moment(a.end, "MMMM YYYY");
    const secondEnd = moment(b.end, "MMMM YYYY");

    const areEqual = firstEnd.isSame(secondEnd);

    if (!areEqual) {
      const isBefore = firstEnd.isBefore(secondEnd);
      if (isBefore) return 1 * multiplier;
      return -1 * multiplier;
    }
  }

  const firstStart = moment(a.start, "MMMM YYYY");
  const secondStart = moment(b.start, "MMMM YYYY");

  const areEqual = firstStart.isSame(secondStart);

  if (areEqual) return 0;

  const isBefore = firstStart.isBefore(secondStart);

  if (isBefore) return 1 * multiplier;
  return -1 * multiplier;
};
