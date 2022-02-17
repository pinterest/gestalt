// @flow strict

/**
 * IMPORTANT NOTE
 * Flow is used in these codemods with the only intention of providing better documentation on hover for each helper function while developing codemods and to increase code readability. Due to the complexity of Flow typing, we use generic types to prevent Flow form complaining. Simple props such as strings or booleans are typed to facilitate the usage of each helper function.
 */

// $FlowFixMe[unclear-type]
type GenericType = any;

type InitializeType = {
  api: { jscodeshift: GenericType },
  file: { source: GenericType },
};

/**
 * initialize: Sets the boilerplate required to work with jscodeshift
 */
const initialize = ({ api, file }: InitializeType): $ReadOnlyArray<mixed> => {
  const j = api.jscodeshift;
  const src = j(file.source);
  return [j, src];
};

type IsNotGestaltImportType = {
  importDeclaration: GenericType,
};

/**
 * isNotGestaltImport: Validates a Gestalt import path returning true if it matches 'gestalt'.
 * E.g. import { Box } from 'gestalt' // true
 * E.g. import { Box } from 'gestaltExtensions/box' // false
 */
const isNotGestaltImport = ({ importDeclaration }: IsNotGestaltImportType): boolean =>
  importDeclaration.source.value !== 'gestalt';

type MatchesComponentNameType = {
  JSXNode: GenericType,
  componentName: string,
};

/**
 * matchesComponentName: Validates an element name against a name value returning true if they match
 * E.g. Box & componentName  = Box // true
 * E.g. Box & componentName = Button // false
 */
const matchesComponentName = ({ JSXNode, componentName }: MatchesComponentNameType): boolean =>
  JSXNode.openingElement.name.name === componentName;

type IsSelfClosingType = {
  JSXNode: GenericType,
};

/**
 * isSelfClosing: Validates that a JSX element is selfclosing
 * E.g. <Box /> // true
 * E.g. <Box></Box> // false
 */
const isSelfClosing = ({ JSXNode }: IsSelfClosingType): boolean =>
  !!JSXNode.openingElement.selfClosing;

type GetImportsType = {
  src: GenericType,
  j: GenericType,
};

/**
 * getImports: Returns an array of the import declaration in a file
 */
const getImports = ({ src, j }: GetImportsType): GenericType => src.find(j.ImportDeclaration);

type GetJSXType = {
  src: GenericType,
  j: GenericType,
};

/**
 * getJSX: Returns an array of the JSX elements in a file
 */
const getJSX = ({ src, j }: GetJSXType): GenericType => src.find(j.JSXElement);

type MatchImportedNameType = {
  importDeclaration: GenericType,
  importedName: string,
};

/**
 * matchImportedName: Returns the named import node if it matches a name value
 * E.g. import { Box } from 'gestalt & (importedName = Box) // true
 * E.g. import { Box } from 'gestalt & (importedName = Button) // false
 */
const matchImportedName = ({
  importDeclaration,
  importedName,
}: MatchImportedNameType): GenericType =>
  importDeclaration.specifiers.find((node) => node.imported.name === importedName);

type ReplaceImportedNamedType = {
  j: GenericType,
  importDeclaration: GenericType,
  previousCmpName: string,
  nextCmpName: string,
};

/**
 * replaceImportedNamed: Replaces the name of a named import
 * E.g. previousCmpName = Box & nextCmpName =  RenamedBox
 * imput: import { Box } from 'gestalt' >> output: import { RenamedBox } from 'gestalt'
 */
const replaceImportedName = ({
  j,
  importDeclaration,
  previousCmpName,
  nextCmpName,
}: ReplaceImportedNamedType): GenericType =>
  importDeclaration.specifiers.map((node) =>
    node.imported.name === previousCmpName ? j.importSpecifier(j.identifier(nextCmpName)) : node,
  );

type SortImportedNamesType = { importSpecifiers: GenericType };

/**
 * sortImportedNames: Returns a sorted list of named imports
 * E.g. imput: import { Pog, Box } from 'gestalt' >> output: import { Box, Pog } from 'gestalt'
 */
const sortImportedNames = ({ importSpecifiers }: SortImportedNamesType): GenericType =>
  importSpecifiers.sort((a, b) => a.imported.name.localeCompare(b.imported.name));

type SourceHasChangesType = { src: GenericType };

/**
 * sourceHasChanges: Adds a 'modified: true' key-value to the src object that indicates the file contains changes that  must be saved
 */
const sourceHasChanges = ({ src }: SourceHasChangesType): void => {
  // eslint-disable-next-line no-param-reassign
  src.modified = true;
};

type ReplaceModifiedJSXNodeType = { j: GenericType, nodePath: GenericType, JSXNode: GenericType };

/**
 * replaceModifiedJSXNode:
 */
const replaceModifiedJSXNode = ({
  j,
  nodePath,
  JSXNode,
}: ReplaceModifiedJSXNodeType): GenericType => j(nodePath).replaceWith(JSXNode);

type ReplaceImportNodePathType = {
  j: GenericType,
  nodePath: GenericType,
  importSpecifiers: GenericType,
  importPath: string,
};

/**
 * replaceModifiedJSXNode: Replaces an import declaration node with an updated one
 * E.g. previousCmpName = Box & nextCmpName =  RenamedBox
 * imput: <Box /> >> output: <RenamedBox />
 */

const replaceImportNodePath = ({
  j,
  nodePath,
  importSpecifiers,
  importPath,
}: ReplaceImportNodePathType): GenericType =>
  j(nodePath).replaceWith(j.importDeclaration(importSpecifiers, j.literal(importPath)));

type RenameJSXElementType = { JSXNode: GenericType, nextCmpName: string };

/**
 * renameJSXElement: Renames the JSX element with the name value provided
 * E.g. previousCmpName = Box & nextCmpName =  RenamedBox
 * imput: <Box /> >> output: <RenamedBox />
 */
const renameJSXElement = ({ JSXNode, nextCmpName }: RenameJSXElementType): void => {
  // eslint-disable-next-line no-param-reassign
  JSXNode.openingElement.name = nextCmpName;

  if (!isSelfClosing({ JSXNode })) {
    // eslint-disable-next-line no-param-reassign
    JSXNode.closingElement.name = nextCmpName;
  }
};

type SaveSourceType = { src: GenericType };

/**
 * saveSource: Saves the changes in the file  if the src object contains the 'modified: true' key-value
 */
const saveSource = ({ src }: SaveSourceType): GenericType =>
  src.modified ? src.toSource({ quote: 'single' }) : null;

type SortJSXElementAttributesType = { JSXNode: GenericType };

/**
 * sortJSXElementAttributes: Returns a sorted list of JSX element attributes
 * E.g. imput: <Box size="" color=""/> >> output: <Box color="" size="" />
 */
const sortJSXElementAttributes = ({ JSXNode }: SortJSXElementAttributesType): GenericType =>
  JSXNode.openingElement.attributes.sort((a, b) => a.name.name.localeCompare(b.name.name));

export {
  getImports,
  getJSX,
  initialize,
  isNotGestaltImport,
  isSelfClosing,
  matchImportedName,
  matchesComponentName,
  replaceImportedName,
  replaceImportNodePath,
  replaceModifiedJSXNode,
  renameJSXElement,
  saveSource,
  sortImportedNames,
  sortJSXElementAttributes,
  sourceHasChanges,
};
