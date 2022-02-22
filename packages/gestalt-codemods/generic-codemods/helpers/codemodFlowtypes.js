// @flow strict

// $FlowExpectedError[unclear-type]
export type ObjectType = Object;

export type ImportSpecifierType = {
  type: string,
  imported: {
    type: string,
    name: string,
  },
  local: {
    type: string,
    name: string,
  },
  name: string,
};

export type ImportDeclarationType = {|
  type: string,
  specifiers: Array<ImportSpecifierType>,
  source: {
    type: string,
    value: string,
    raw: string,
  },
|};

export type NodePathType = {|
  value: {|
    type: string,
    specifiers: Array<ImportSpecifierType>,
  |},
  name: string,
  node: {| specifiers: Array<ImportSpecifierType> |},
|};

export type JSXAttributeType = {|
  type: string,
  name: {|
    type: string,
    name: string,
  |},
  value: {|
    type: string,
    expression: {|
      type: string,
      value: number | string,
      raw: string,
    |},
  |},
|};

export type JSXNodeType = {|
  type: string,
  loc: {|
    start: {| line: number, column: number, token: number |},
    end: {| line: number, column: number, token: number |},
  |},
  range: Array<number>,
  openingElement: {|
    type: string,
    name: {|
      type: string,
      name: ObjectType,
      optional: boolean,
      object: ObjectType,
      property: ObjectType,
    |},
    attributes: Array<JSXAttributeType>,
    selfClosing: true,
  |},
  closingElement: ?{|
    type: string,
    name: ObjectType,
  |},
|};

export interface Collection {
  find(type: ObjectType): Collection;
  filter(callback: (node: ObjectType) => boolean): Collection;
  forEach(callback: (node: ObjectType) => void): Collection;
  replaceWith: (node: ObjectType) => Collection;
  toSource(options?: ObjectType): string;
  modified: boolean;
}

export type JSCodeShift = {
  (source: string): Collection,
  ImportDeclaration: ImportDeclarationType,
  importSpecifier: (ObjectType) => ImportSpecifierType,
  JSXElement: (ObjectType) => JSXNodeType,
  identifier: (ObjectType) => { name: string, type: string },
};

export type FileType = {| path: string, source: string |};

export type ApiType = {| jscodeshift: JSCodeShift |};

export type Transform<Options> = (fileInfo: FileType, api: ApiType, options: Options) => ?string;
