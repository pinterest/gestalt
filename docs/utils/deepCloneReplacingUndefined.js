// @flow strict

// getStaticProps and getServerSideProps serialize to JSON, so any 'undefined' values must be replaced with 'null' to avoid invalid JSON
// $FlowFixMe[unclear-type]
export default function deepCloneReplacingUndefined(origObj: Object): Object {
  const isPlainObject = (value) => value?.constructor === Object;
  const cleanValue = (val) => (val === undefined ? null : val);
  const getValueOrDeepClone = (val) =>
    isPlainObject(val) || Array.isArray(val) ? deepCloneReplacingUndefined(val) : val;

  if (isPlainObject(origObj)) {
    return Object.keys(origObj).reduce((acc, cur) => {
      const val = origObj[cur];
      const cleanedVal = cleanValue(val);
      return {
        ...acc,
        [cur]: getValueOrDeepClone(cleanedVal),
      };
    }, {});
  }
  if (Array.isArray(origObj)) {
    return origObj.reduce((acc, cur) => {
      const cleanedVal = cleanValue(cur);
      return [...acc, getValueOrDeepClone(cleanedVal)];
    }, []);
  }
  // This should never happen on recursive calls
  return origObj;
}
