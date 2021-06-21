// @flow strict

// $FlowFixMe[unclear-type] The whole point is that we don't know the type of val
export default function isNotNullish(val: any): boolean {
  return val !== null && val !== undefined;
}
