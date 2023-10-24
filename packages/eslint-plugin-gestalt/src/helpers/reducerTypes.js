// @flow strict

// $FlowFixMe[unclear-type]
export type GenericType = any;

export type GenericNode = GenericType;

export type ReducerAccType = $ReadOnlyArray<{
  node: GenericNode,
  prop?: ?string | number,
  message?: ?string | number,
}>;

export type ReducerType = (ReducerAccType, { [string]: GenericType }) => ReducerAccType;

export type GenerateDefaultMessageType = (?string | number) => ?string;

export type BuildReducerType = ({ context: GenericNode }) => ReducerType;
