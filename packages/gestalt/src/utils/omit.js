// @flow strict

const contains = (key: string, arr: $ReadOnlyArray<string>) => arr.indexOf(key) >= 0;
// $FlowExpectedError[unclear-type]
const omit = (keys: $ReadOnlyArray<string>, obj: Object): Object =>
  Object.keys(obj).reduce((acc, k: string) => {
    if (contains(k, keys)) {
      return acc;
    }
    return {
      ...acc,
      [k]: obj[k],
    };
  }, {});

export default omit;
