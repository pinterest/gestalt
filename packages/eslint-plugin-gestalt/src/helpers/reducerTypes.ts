export type GenericType = any;

export type GenericNode = GenericType;

export type ReducerAccType = ReadonlyArray<{
  node: GenericNode;
  prop?: string | null | undefined | number;
  message?: string | null | undefined | number;
}>;

export type ReducerType = (
  arg1: ReducerAccType,
  arg2: {
    [key: string]: GenericType;
  },
) => ReducerAccType;

export type GenerateDefaultMessageType = (
  arg1: string | null | undefined | number,
) => string | null | undefined;

export type BuildReducerType = (arg1: { context: GenericNode }) => ReducerType;
