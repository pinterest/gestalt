// @flow strict

const contains = (key, arr) => arr.indexOf(key) >= 0;
// $FlowExpectedError[unclear-type]
const omit = (keys: Array<string>, obj: Object): Object =>
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
