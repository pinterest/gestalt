// @flow strict

// $FlowExpectedError[unclear-type]
export type ObjectType = Object;

export type ImportSpecifierType = {|
  type: string,
  imported: {|
    type: string,
    name: string,
  |},
  local: {|
    type: string,
    name: string,
  |},
  name: string,
|};

export type ImportDeclarationType = {|
  type: string,
  specifiers: Array<ImportSpecifierType>,
  source: {
    type: string,
    value: string,
    raw: string,
  },
|};

export type JSXAttributeType = {|
  type: string,
  name: {|
    type: string,
    name: string,
  |},
  value: {|
    type: string,
    expression?: {|
      type: string,
      value: number | string,
      raw: string,
    |},
    value?: string,
    raw?: string,
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

export type ASTNodeType = {|
  type: string,
  name: ?string,
  specifiers?: Array<ImportSpecifierType>,
  local?: {| name: string |},
|};

export type NodePathType = {|
  value: {|
    type: string,
    specifiers: Array<ImportSpecifierType>,
  |},
  name: string,
  node: ASTNodeType | JSXNodeType,
|};
export interface Collection {
  at: (number) => Collection;
  get: (?number) => NodePathType;
  find(type: ObjectType, options: { [string]: ObjectType }): Collection;
  filter(callback: (node: ObjectType) => boolean): Collection;
  forEach(callback: (node: ObjectType) => void): Collection;
  replaceWith: (node: ObjectType) => Collection;
  remove: () => void;
  size: () => number;
  toSource(options?: ObjectType): string;
  modified: boolean;
}

export type JSCodeShift = {
  (source: string): Collection,
  ImportDeclaration: ImportDeclarationType,
  ImportSpecifier: (ObjectType) => ImportSpecifierType,
  JSXElement: (ObjectType) => JSXNodeType,
  JSXAttribute: (ObjectType) => JSXAttributeType,
  Identifier: (ObjectType) => { name: string, type: string },
  jsxAttribute: (ObjectType, ObjectType) => ObjectType,
  jsxIdentifier: (ObjectType) => ObjectType,
  stringLiteral: (?string) => ObjectType,
};

export type FileType = {| path: string, source: string |};

export type ApiType = {| jscodeshift: JSCodeShift |};
