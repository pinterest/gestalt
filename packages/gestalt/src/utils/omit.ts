const contains = (key: string, arr: ReadonlyArray<string>) => arr.indexOf(key) >= 0;
const omit = (keys: ReadonlyArray<string>, obj: any): any =>
  Object.keys(obj).reduce<Record<string, any>>((acc, k: string) => {
    if (contains(k, keys)) {
      return acc;
    }
    return {
      ...acc,
      [k]: obj[k],
    };
  }, {});

export default omit;
