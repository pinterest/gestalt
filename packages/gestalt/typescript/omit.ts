const contains = (key, arr) => arr.indexOf(key) >= 0;

// $FlowExpectedError[unclear-type]
const omit = (
  keys: ReadonlyArray<string>,
  obj: Record<string, any>
): Record<string, any> =>
  Object.keys(obj).reduce((acc, k: string) => {
    if (contains(k, keys)) {
      return acc;
    }

    return { ...acc, [k]: obj[k] };
  }, {});

export default omit;