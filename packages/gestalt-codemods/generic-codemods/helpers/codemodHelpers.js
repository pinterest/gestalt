// @flow strict
import { type FileType, type ApiType } from './codemodFlowtypes.js';

/**
 * IMPORTANT NOTE
 * Flow is used in these codemods with the only intention of providing better documentation on hover for each helper function while developing codemods and to increase code readability. Due to the complexity of Flow typing, we use generic types to prevent Flow from complaining. Simple props such as strings or booleans are typed to facilitate the usage of each helper function.
 */

// $FlowFixMe[unclear-type]
type AnyType = any;

type InitializeType = {|
  api: ApiType,
  file: FileType,
|};

/**
 * initialize: Sets the boilerplate required to work with jscodeshift
 */
const initialize = ({ api, file }: InitializeType): $ReadOnlyArray<mixed> => {
  const j = api.jscodeshift;
  const src = j(file.source);
  return [j, src];
};

type IsGestaltImportType = {| importDeclaration: AnyType |};

/**
 * isGestaltImport: Validates a Gestalt import path returning true if it matches 'gestalt'.
 * E.g. import { Box } from 'gestalt' // true
 * E.g. import { Box } from 'gestaltExtensions/box' // false
 */
const isGestaltImport = ({ importDeclaration }: IsGestaltImportType): boolean =>
  importDeclaration.source.value === 'gestalt';

type MatchesComponentNameType = {|
  JSXNode: AnyType,
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

type IsSelfClosingType = {| JSXNode: AnyType |};

/**
 * isSelfClosing: Validates that a JSX element is selfclosing
 * E.g. <Box /> // true
 * E.g. <Box></Box> // false
 */
const isSelfClosing = ({ JSXNode }: IsSelfClosingType): boolean =>
  !!JSXNode.openingElement.selfClosing;

type GetImportsType = {| src: AnyType, j: AnyType |};

/**
 * getImports: Returns an array of the import declaration in a file
 */
const getImports = ({ src, j }: GetImportsType): AnyType => src.find(j.ImportDeclaration);

type GetJSXType = {| src: AnyType, j: AnyType |};

/**
 * getJSX: Returns an array of the JSX elements in a file
 */
const getJSX = ({ src, j }: GetJSXType): AnyType => src.find(j.JSXElement);

type GetLocalImportedNameType = {|
  importDeclaration: AnyType,
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
}: GetLocalImportedNameType): AnyType =>
  importDeclaration.specifiers
    .filter((node) => node.imported.name === importedName)
    .map((node) => node.local.name)[0];

type ReplaceImportedNamedType = {|
  j: AnyType,
  importDeclaration: AnyType,
  previousCmpName: string,
  nextCmpName: string,
|};

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
}: ReplaceImportedNamedType): AnyType =>
  importDeclaration.specifiers.map((node) =>
    node.imported.name === previousCmpName ? j.importSpecifier(j.identifier(nextCmpName)) : node,
  );

type SortImportedNamesType = {| importSpecifiers: AnyType |};

/**
 * sortImportedNames: Returns a sorted list of named imports
 * E.g. imput: import { Pog, Box } from 'gestalt' >> output: import { Box, Pog } from 'gestalt'
 */
const sortImportedNames = ({ importSpecifiers }: SortImportedNamesType): AnyType =>
  importSpecifiers.sort((a, b) => a.imported.name.localeCompare(b.imported.name));

type ReplaceImportNodePathType = {|
  j: AnyType,
  nodePath: AnyType,
  importSpecifiers: AnyType,
  importPath: string,
|};

/**
 * replaceImportNodePath: Replaces an import declaration node with an updated one
 * E.g. previousCmpName = Box & nextCmpName =  RenamedBox
 * imput: <Box /> >> output: <RenamedBox />
 */

const replaceImportNodePath = ({ nodePath, importSpecifiers }: ReplaceImportNodePathType): void => {
  // eslint-disable-next-line no-param-reassign
  nodePath.node.specifiers = importSpecifiers;
};

type RenameJSXElementType = {| JSXNode: AnyType, nextCmpName: string |};

/**
 * renameJSXElement: Renames the JSX element with the name value provided
 * E.g. previousCmpName = Box & nextCmpName =  RenamedBox
 * imput: <Box /> >> output: <RenamedBox />
 */
const renameJSXElement = ({ JSXNode, nextCmpName }: RenameJSXElementType): void => {
  const newJSXNode = { ...JSXNode };
  newJSXNode.openingElement.name = nextCmpName;

  if (!isSelfClosing({ JSXNode })) {
    newJSXNode.closingElement.name = nextCmpName;
  }
};

type GetNewAttributesType = {|
  JSXNode: AnyType,
  action: string,
  previousPropName: string,
  nextPropName?: string,
|};

/**
 * getNewAttributes: Renames the JSX element with the name value provided
 * E.g. previousCmpName = Box & nextCmpName =  RenamedBox
 * imput: <Box /> >> output: <RenamedBox />
 */
const getNewAttributes = ({
  JSXNode,
  action,
  previousPropName,
  nextPropName,
}: GetNewAttributesType): AnyType =>
  JSXNode.openingElement.attributes
    .map((attr) => {
      const propName = attr?.name?.name;

      if (propName !== previousPropName) return attr;

      const renamedAttr = { ...attr };

      renamedAttr.name.name = nextPropName;

      return action === 'rename' ? renamedAttr : false;
    })
    .filter(Boolean);

type ReplaceJSXAttributesType = {| JSXNode: AnyType, newAttributes: AnyType |};

/**
 * replaceJSXAttributes: Saves the changes in the file  if the src object contains the 'modified: true' key-value
 */
const replaceJSXAttributes = ({ JSXNode, newAttributes }: ReplaceJSXAttributesType): void => {
  const newJSXNode = { ...JSXNode };

  newJSXNode.openingElement.attributes = newAttributes;
};

type SaveSourceType = {| src: AnyType |};

/**
 * saveSource: Saves the changes in the file  if the src object contains the 'modified: true' key-value
 */
const saveSource = ({ src }: SaveSourceType): AnyType =>
  src.modified ? src.toSource({ quote: 'single' }) : null;

type SortJSXElementAttributesType = {| JSXNode: AnyType |};

/**
 * sortJSXElementAttributes: Returns a sorted list of JSX element attributes
 * E.g. imput: <Box size="" color=""/> >> output: <Box color="" size="" />
 */
const sortJSXElementAttributes = ({ JSXNode }: SortJSXElementAttributesType): AnyType =>
  JSXNode.openingElement.attributes.sort((a, b) => a.name.name.localeCompare(b.name.name));

type ThrowErrorIfSpreadType = {| file: FileType, JSXNode: AnyType |};

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
  sortJSXElementAttributes,
  throwErrorIfSpreadProps,
};
