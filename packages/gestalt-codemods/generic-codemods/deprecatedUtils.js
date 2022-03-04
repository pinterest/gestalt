// @flow strict
import {
  type ApiType,
  type Collection,
  type FileType,
  type JSCodeShift,
  type JSXNodeType,
  type ImportDeclarationType,
  type NodePathType,
  type ImportSpecifierType,
} from './flowtypes.js';

/**
 * initialize: Sets the boilerplate required to work with jscodeshift. Returns:
 j: the jscodeshift library API access
 src: a collection of one node-path, which wraps the root AST node
 */
const initialize = ({
  api,
  fileInfo,
}: {|
  api: ApiType,
  fileInfo: FileType,
|}): { j: JSCodeShift, src: Collection } => {
  const j = api.jscodeshift;
  const src = j(fileInfo.source);
  return { j, src };
};

/**
 * isGestaltImport: Validates a Gestalt import path returning true if it matches 'gestalt'.
 * E.g. import { Box } from 'gestalt' // true
 * E.g. import { Box } from 'gestaltExtensions/box' // false
 */
const isGestaltImport = ({
  importDeclaration,
}: {|
  importDeclaration: ImportDeclarationType,
|}): boolean => importDeclaration.source.value === 'gestalt';

/**
 * matchesComponentName: Validates an element name against a name value returning true if they match
 * E.g. Box & componentName  = Box // true
 * E.g. Box & componentName = Button // false
 * E.g. Dropdown.Item & componentName  = Dropdown, subcomponentName = Item // true
 * E.g. Dropdown.Link & componentName  = Dropdown, subcomponentName = Item // false
 */
const matchesComponentName = ({
  JSXNode,
  componentName,
  subcomponentName,
}: {|
  JSXNode: JSXNodeType,
  componentName: string,
  subcomponentName?: string,
|}): boolean => {
  if (subcomponentName && !JSXNode.openingElement.name.name) {
    return (
      JSXNode.openingElement.name.object.name === componentName &&
      JSXNode.openingElement.name.property.name === subcomponentName
    );
  }

  return JSXNode.openingElement.name.name === componentName;
};

/**
 * isSelfClosing: Validates that a JSX element is selfclosing
 * E.g. <Box /> // true
 * E.g. <Box></Box> // false
 */
const isSelfClosing = ({ JSXNode }: {| JSXNode: JSXNodeType |}): boolean =>
  !!JSXNode.openingElement.selfClosing;

/**
 * getImports: Returns an array of the import declaration in a file
 */
const getImports = ({ src, j }: {| src: Collection, j: JSCodeShift |}): Collection =>
  src.find(j.ImportDeclaration);

/**
 * getJSX: Returns an array of the JSX elements in a file
 */
const getJSX = ({ src, j }: {| src: Collection, j: JSCodeShift |}): Collection =>
  src.find(j.JSXElement);

/**
 * getLocalImportedName: Returns the local named import node if it matches a name value
 * E.g. import { Box } from 'gestalt & (importedName = Box) // Box
 * E.g. import { Box as RenamedBox } from 'gestalt & (importedName = Box) // RenamedBox
 */
const getLocalImportedName = ({
  importDeclaration,
  importedName,
}: {|
  importDeclaration: ImportDeclarationType,
  importedName: string,
|}): string => {
  if (importDeclaration?.specifiers) {
    return importDeclaration.specifiers
      .filter((node) => node.imported.name === importedName)
      .map((node) => node.local.name)[0];
  }

  let specifiers;
  importDeclaration.forEach((node) => {
    if (node.value.specifiers) {
      specifiers = node.value.specifiers;
    }
  });

  return specifiers
    .filter((node) => node.imported.name === importedName)
    .map((node) => node.local.name)[0];
};

/**
 * replaceImportedNamed: Replaces the name of a named import
 * E.g. previousComponentName = Box & nextComponentName =  RenamedBox
 * input: import { Box } from 'gestalt' >> output: import { RenamedBox } from 'gestalt'
 */
const replaceImportedName = ({
  j,
  importDeclaration,
  previousComponentName,
  nextComponentName,
}: {|
  j: JSCodeShift,
  importDeclaration: ImportDeclarationType,
  previousComponentName: string,
  nextComponentName: string,
|}): Array<ImportSpecifierType> =>
  importDeclaration.specifiers.map((node) =>
    node.imported.name === previousComponentName
      ? j.importSpecifier(j.identifier(nextComponentName))
      : node,
  );

/**
 * sortImportedNames: Returns a sorted list of named imports
 * E.g. input: import { Pog, Box } from 'gestalt' >> output: import { Box, Pog } from 'gestalt'
 */
const sortImportedNames = ({
  importSpecifiers,
}: {|
  importSpecifiers: Array<ImportSpecifierType>,
|}): Array<ImportSpecifierType> =>
  importSpecifiers.sort((a, b) => a.imported.name.localeCompare(b.imported.name));

/**
 * replaceImportNodePath: Replaces an import declaration node with an updated one
 * E.g. previousComponentName = Box & nextComponentName =  RenamedBox
 * input: <Box /> >> output: <RenamedBox />
 */

const replaceImportNodePath = ({
  nodePath,
  importSpecifiers,
}: {|
  j: JSCodeShift,
  nodePath: NodePathType,
  importSpecifiers: Array<ImportSpecifierType>,
  importPath: string,
|}): void => {
  // TODO: find alternative to prevent reassignment
  // eslint-disable-next-line no-param-reassign
  nodePath.node.specifiers = importSpecifiers;
};

/**
 * renameJSXElement: Renames the JSX element with the name value provided
 * E.g. previousComponentName = Box & nextComponentName =  RenamedBox
 * input: <Box /> >> output: <RenamedBox />
 */
const renameJSXElement = ({
  JSXNode,
  nextComponentName,
}: {|
  JSXNode: JSXNodeType,
  nextComponentName: string,
|}): void => {
  // TODO: implement deep cloning or prevent reassignment
  const newJSXNode = { ...JSXNode };
  newJSXNode.openingElement.name.name = nextComponentName;

  if (!isSelfClosing({ JSXNode })) {
    if (newJSXNode.closingElement) {
      newJSXNode.closingElement.name.name = nextComponentName;
    }
  }
};

/**
 * saveToSource: Saves the changes in the file  if the src object contains the 'modified: true' key-value
 */ const saveToSource = ({ src }: {| src: Collection |}): string | null =>
  src.modified ? src.toSource({ quote: 'single' }) : null;

/**
 * throwErrorIfSpreadProps: Throws an error message if component contains spread props which are opaque to  codemods
 * E.g. <Box {...props} /> // error!
 */
const throwErrorIfSpreadProps = ({
  fileInfo,
  JSXNode,
}: {|
  fileInfo: FileType,
  JSXNode: JSXNodeType,
|}): void => {
  if (
    JSXNode.openingElement.attributes.some((attribute) => attribute.type === 'JSXSpreadAttribute')
  ) {
    throw new Error(
      `Remove dynamic properties and rerun codemod. Location: ${fileInfo.path} @line: ${JSXNode.loc.start.line}`,
    );
  }
};

export {
  getImports,
  getJSX,
  getLocalImportedName,
  initialize,
  isGestaltImport,
  matchesComponentName,
  replaceImportedName,
  replaceImportNodePath,
  renameJSXElement,
  saveToSource,
  sortImportedNames,
  throwErrorIfSpreadProps,
};
