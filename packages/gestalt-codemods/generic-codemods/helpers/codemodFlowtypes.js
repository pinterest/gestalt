// @flow strict

// Flow types courtesy of https://github.com/flow/flow-codemod/blob/master/transforms/strict-type-args/src/strict-type-args.js

// $FlowExpectedError[unclear-type]
type ObjectType = Object;

interface Collection {
  find(type: ObjectType, filter?: (node: ObjectType) => boolean): Collection;
  filter(callback: (node: ObjectType) => boolean): Collection;
  forEach(callback: (node: ObjectType) => void): Collection;
  replaceWith: (node: ObjectType) => Collection;
  toSource(options?: ObjectType): string;
}

type JSCodeShift = {
  (source: ObjectType | Array<ObjectType> | string): Collection,
  // node types
  GenericTypeAnnotation: ObjectType,
  // builders
  genericTypeAnnotation: () => ObjectType,
  typeParameterInstantiation: (args: Array<ObjectType>) => ObjectType,
  anyTypeAnnotation: () => ObjectType,
};

export type FileType = {| path: string, source: string |};

export type ApiType = {| jscodeshift: JSCodeShift, stats: (stat: string) => void |};

export type Transform<Options> = (fileInfo: FileType, api: ApiType, options: Options) => ?string;
