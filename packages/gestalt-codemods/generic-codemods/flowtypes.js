// @flow strict

// $FlowExpectedError[unclear-type]
export type GenericObjectType = Object;

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

export type NodePathType = {
  parentPath: { parentPath: GenericObjectType },
  value: {
    type: string,
    specifiers: Array<ImportSpecifierType>,
  },
  name: string,
  node: { specifiers: Array<ImportSpecifierType> },
};

export type ImportDeclarationType = {
  type: string,
  specifiers: Array<ImportSpecifierType>,
  source: {
    type: string,
    value: string,
    raw: string,
  },
};

export type JSXAttributeType = {
  type: string,
  name: {
    type: string,
    name: string,
  },
  value: {
    type: string,
    expression?: {
      type: string,
      value: number | string,
      raw: string,
    },
    value?: string,
    raw?: string,
  },
};

export type JSXNodeType = {
  type: string,
  loc: {
    start: { line: number, column: number, token: number },
    end: { line: number, column: number, token: number },
  },
  range: Array<number>,
  openingElement: {
    type: string,
    name: {
      type: string,
      name: GenericObjectType,
      optional: boolean,
      object: GenericObjectType,
      property: GenericObjectType,
    },
    attributes: Array<JSXAttributeType>,
    selfClosing: true,
  },
  closingElement: ?{
    type: string,
    name: GenericObjectType,
  },
  local?: { name: string },
};

export interface Collection {
  at: (number) => Collection;
  get: <T>(?number) => T;
  find(type: GenericObjectType, options?: { [string]: GenericObjectType }): Collection;
  filter(callback: (node: GenericObjectType) => boolean): Collection;
  forEach(callback: (node: GenericObjectType) => void): Collection;
  replaceWith: (node: GenericObjectType) => Collection;
  remove: () => void;
  nodes: () => GenericObjectType;
  size: () => number;
  toSource(options?: GenericObjectType): string;
  modified: boolean;
}

export type JSCodeShift = {
  (source: string): Collection,
  ImportDeclaration: ImportDeclarationType,
  ImportSpecifier: (GenericObjectType) => ImportSpecifierType,
  JSXElement: (GenericObjectType) => JSXNodeType,
  JSXAttribute: (GenericObjectType) => JSXAttributeType,
  importSpecifier: (GenericObjectType) => GenericObjectType,
  identifier: (GenericObjectType) => { name: string, type: string },
  jsxAttribute: (GenericObjectType, GenericObjectType) => GenericObjectType,
  jsxIdentifier: (GenericObjectType) => GenericObjectType,
  stringLiteral: (?string) => GenericObjectType,
  jsxExpressionContainer: (GenericObjectType) => GenericObjectType,
  numericLiteral: (number) => GenericObjectType,
  booleanLiteral: (boolean) => GenericObjectType,
  JSXSpreadAttribute: GenericObjectType,
};

export type FileType = { path: string, source: string };

export type ApiType = { jscodeshift: JSCodeShift };
