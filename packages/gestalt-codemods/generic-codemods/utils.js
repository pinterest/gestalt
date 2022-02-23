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
  type JSXAttributeType,
} from './flowtypes.js';

type InitializeType = {|
  api: ApiType,
  file: FileType,
|};

/**
 * initialize: Sets the boilerplate required to work with jscodeshift
 */
const initialize = ({ api, file }: InitializeType): { j: JSCodeShift, src: Collection } => {
  const j = api.jscodeshift;
  const src = j(file.source);
  return { j, src };
};

type IsGestaltImportType = {| importDeclaration: ImportDeclarationType |};

/**
 * isGestaltImport: Validates a Gestalt import path returning true if it matches 'gestalt'.
 * E.g. import { Box } from 'gestalt' // true
 * E.g. import { Box } from 'gestaltExtensions/box' // false
 */
const isGestaltImport = ({ importDeclaration }: IsGestaltImportType): boolean =>
  importDeclaration.source.value === 'gestalt';

type MatchesComponentNameType = {|
  JSXNode: JSXNodeType,
  componentName: string,
  subcomponentName?: string,
|};

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
}: MatchesComponentNameType): boolean => {
  if (subcomponentName && !JSXNode.openingElement.name.name) {
    return (
      JSXNode.openingElement.name.object.name === componentName &&
      JSXNode.openingElement.name.property.name === subcomponentName
    );
  }

  return JSXNode.openingElement.name.name === componentName;
};

type IsSelfClosingType = {| JSXNode: JSXNodeType |};

/**
 * isSelfClosing: Validates that a JSX element is selfclosing
 * E.g. <Box /> // true
 * E.g. <Box></Box> // false
 */
const isSelfClosing = ({ JSXNode }: IsSelfClosingType): boolean =>
  !!JSXNode.openingElement.selfClosing;

type GetImportsType = {| src: Collection, j: JSCodeShift |};

/**
 * getImports: Returns an array of the import declaration in a file
 */
const getImports = ({ src, j }: GetImportsType): Collection => src.find(j.ImportDeclaration);

type GetJSXType = {| src: Collection, j: JSCodeShift |};

/**
 * getJSX: Returns an array of the JSX elements in a file
 */
const getJSX = ({ src, j }: GetJSXType): Collection => src.find(j.JSXElement);

type GetLocalImportedNameType = {|
  importDeclaration: ImportDeclarationType,
  importedName: string,
|};

/**
 * getLocalImportedName: Returns the local named import node if it matches a name value
 * E.g. import { Box } from 'gestalt & (importedName = Box) // Box
 * E.g. import { Box as RenamedBox } from 'gestalt & (importedName = Box) // RenamedBox
 */
const getLocalImportedName = ({
  importDeclaration,
  importedName,
}: GetLocalImportedNameType): string =>
  importDeclaration.specifiers
    .filter((node) => node.imported.name === importedName)
    .map((node) => node.local.name)[0];

type ReplaceImportedNamedType = {|
  j: JSCodeShift,
  importDeclaration: ImportDeclarationType,
  previousComponentName: string,
  nextComponentName: string,
|};

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
}: ReplaceImportedNamedType): Array<ImportSpecifierType> =>
  importDeclaration.specifiers.map((node) =>
    node.imported.name === previousComponentName
      ? j.importSpecifier(j.identifier(nextComponentName))
      : node,
  );

type SortImportedNamesType = {| importSpecifiers: Array<ImportSpecifierType> |};

/**
 * sortImportedNames: Returns a sorted list of named imports
 * E.g. input: import { Pog, Box } from 'gestalt' >> output: import { Box, Pog } from 'gestalt'
 */
const sortImportedNames = ({
  importSpecifiers,
}: SortImportedNamesType): Array<ImportSpecifierType> =>
  importSpecifiers.sort((a, b) => a.imported.name.localeCompare(b.imported.name));

type ReplaceImportNodePathType = {|
  j: JSCodeShift,
  nodePath: NodePathType,
  importSpecifiers: Array<ImportSpecifierType>,
  importPath: string,
|};

/**
 * replaceImportNodePath: Replaces an import declaration node with an updated one
 * E.g. previousComponentName = Box & nextComponentName =  RenamedBox
 * input: <Box /> >> output: <RenamedBox />
 */

const replaceImportNodePath = ({ nodePath, importSpecifiers }: ReplaceImportNodePathType): void => {
  // TODO: find alternative to prevent reassignment
  // eslint-disable-next-line no-param-reassign
  nodePath.node.specifiers = importSpecifiers;
};

type RenameJSXElementType = {| JSXNode: JSXNodeType, nextComponentName: string |};

/**
 * renameJSXElement: Renames the JSX element with the name value provided
 * E.g. previousComponentName = Box & nextComponentName =  RenamedBox
 * input: <Box /> >> output: <RenamedBox />
 */
const renameJSXElement = ({ JSXNode, nextComponentName }: RenameJSXElementType): void => {
  // TODO: implement deep cloning or prevent reassignment
  const newJSXNode = { ...JSXNode };
  newJSXNode.openingElement.name.name = nextComponentName;

  if (!isSelfClosing({ JSXNode })) {
    if (newJSXNode.closingElement) {
      newJSXNode.closingElement.name.name = nextComponentName;
    }
  }
};

type GetNewAttributesType = {|
  JSXNode: JSXNodeType,
  previousPropName: string,
  nextPropName: string | null,
|};

/**
 * getNewAttributes: Renames the JSX element with the name value provided
 * E.g. previousComponentName = Box & nextComponentName =  RenamedBox
 * input: <Box /> >> output: <RenamedBox />
 */
const getNewAttributes = ({
  JSXNode,
  previousPropName,
  nextPropName,
}: GetNewAttributesType): Array<JSXAttributeType> =>
  JSXNode.openingElement.attributes
    .map((attr) => {
      const propName = attr?.name?.name;

      if (propName !== previousPropName) return attr;

      const renamedAttr = { ...attr };

      if (nextPropName) renamedAttr.name.name = nextPropName;

      return nextPropName !== null && nextPropName ? renamedAttr : undefined;
    })
    .filter(Boolean);

type ReplaceJSXAttributesType = {|
  JSXNode: JSXNodeType,
  newAttributes: Array<JSXAttributeType>,
|};

/**
 * replaceJSXAttributes: Saves the changes in the file  if the src object contains the 'modified: true' key-value
 */
const replaceJSXAttributes = ({ JSXNode, newAttributes }: ReplaceJSXAttributesType): void => {
  // TODO: implement deep cloning or prevent reassignment
  const newJSXNode = { ...JSXNode };

  newJSXNode.openingElement.attributes = newAttributes;
};

type SaveSourceType = {| src: Collection |};

/**
 * saveSource: Saves the changes in the file  if the src object contains the 'modified: true' key-value
 */ const saveSource = ({ src }: SaveSourceType): string | null =>
  src.modified ? src.toSource({ quote: 'single' }) : null;

type ThrowErrorIfSpreadType = {| file: FileType, JSXNode: JSXNodeType |};

/**
 * throwErrorIfSpreadProps: Throws an error message if component contains spread props which are opaque to  codemods
 * E.g. <Box {...props} /> // error!
 */
const throwErrorIfSpreadProps = ({ file, JSXNode }: ThrowErrorIfSpreadType): void => {
  if (
    JSXNode.openingElement.attributes.some((attribute) => attribute.type === 'JSXSpreadAttribute')
  ) {
    throw new Error(
      `Remove dynamic properties and rerun codemod. Location: ${file.path} @line: ${JSXNode.loc.start.line}`,
    );
  }
};

export {
  getImports,
  getJSX,
  getLocalImportedName,
  getNewAttributes,
  initialize,
  isGestaltImport,
  isSelfClosing,
  matchesComponentName,
  replaceImportedName,
  replaceImportNodePath,
  renameJSXElement,
  replaceJSXAttributes,
  saveSource,
  sortImportedNames,
  throwErrorIfSpreadProps,
};
