export const chunk = <T extends unknown>(arr: T[], size: number): T[][] => {
  const newArr = [];

  for (let i = 0; i < arr.length; i += size) {
    newArr.push(arr.slice(i, i + size));
  }

  return newArr;
};
