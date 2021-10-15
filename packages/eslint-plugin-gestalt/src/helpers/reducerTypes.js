// @flow strict

// $FlowFixMe[unclear-type]
export type GenericType = any;

export type GenericNode = GenericType;

export type MatchKeyErrorsAccType = $ReadOnlyArray<{|
  node: GenericNode,
  prop?: ?string | number,
  message?: ?string | number,
|}>;

export type MatchKeyErrorsType = (
  MatchKeyErrorsAccType,
  { [string]: GenericType },
) => MatchKeyErrorsAccType;

export type GenerateDefaultMessageType = (?string | number) => ?string;

export type ReducerType = ({| context: GenericNode |}) => MatchKeyErrorsType;
