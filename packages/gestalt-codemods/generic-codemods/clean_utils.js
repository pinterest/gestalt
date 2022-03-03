// @flow strict
// $FlowExpectedError[untyped-import]
// import { describe } from 'jscodeshift-helper';
import {
  type ApiType,
  type Collection,
  type FileType,
  type JSCodeShift,
  type JSXNodeType,
} from './flowtypes.js';

/**
 *
 * IMPORTANT
 *
 * BEFORE YOU START DEVELOPING CODEMODS READ THE FOLLOWING DOCUMENTATION HERE
 *
 * packages/gestalt-codemods/generic-codemods/README.md
 *
 */

/**
 * initialize: Sets the boilerplate required to work with jscodeshift.
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
 * getComponentIdentifierByName: Returns a collection containing the component specifier from the Gestalt import declaration collection that matches the componentName value
 */
const getComponentIdentifierByName = ({
  j,
  gestaltImportCollection,
  componentName,
}: {|
  j: JSCodeShift,
  gestaltImportCollection: Collection,
  componentName: string,
|}): Collection =>
  gestaltImportCollection.find(j.ImportSpecifier, {
    imported: {
      type: 'Identifier',
      name: componentName,
    },
  });

/**
 * getGestaltImport: Returns a collection containing the Gestalt import declaration node-path
 */
const getGestaltImport = ({ src, j }: {| src: Collection, j: JSCodeShift |}): Collection =>
  src.find(j.ImportDeclaration, {
    source: {
      type: 'Literal',
      value: 'gestalt',
    },
  });

/**
 * getLocalImportedName: Returns the local named import for a Gestalt component
 * E.g. import { Box } from 'gestalt // Box
 * E.g. import { Box as RenamedBox } from 'gestalt // RenamedBox
 */
const getLocalImportedName = ({ importSpecifierCollection }: { importSpecifierCollection: Collection }): ?string =>
  importSpecifierCollection.get(0).node.local?.name;

/**
 * filterJSXByTargetLocalName: Returns a collection containing the Gestalt JSX component matching the targetLocalName value
 */
const filterJSXByTargetLocalName = ({
  src,
  j,
  targetLocalName,
  subcomponent,
}: {|
  src: Collection,
  j: JSCodeShift,
  targetLocalName: ?string,
  subcomponent: ?string,
|}): Collection =>
  subcomponent
    ? src.find(j.JSXElement, {
        openingElement: {
          name: { object: { name: targetLocalName }, property: { name: subcomponent } },
        },
      })
    : src.find(j.JSXElement, { openingElement: { name: { name: targetLocalName } } });
/**
 * filterJSXByAttribute: Returns a collection containing the Gestalt JSX components with matching prop/value attributes
 */
const filterJSXByAttribute = ({
  j,
  jSXCollection,
  prop,
  value,
}: {
  j: JSCodeShift,
  jSXCollection: Collection,
  prop: string,
  value: string,
}): Collection => jSXCollection.find(j.JSXAttribute, { name: { name: prop }, value: { value } });

/**
 * deepCloneNode: Returns a collection containing the Gestalt import declaration node-path
 */
const deepCloneNode = ({ node }: { node: JSXNodeType }): JSXNodeType =>
  JSON.parse(JSON.stringify(node));

/**
 * buildReplaceWithModifiedAttributes: Returns a collection containing the Gestalt import declaration node-path
 */
const buildReplaceWithModifiedAttributes = ({
  nextProp,
  nextValue,
}: {
  nextProp: string,
  nextValue: string,
}): ((nodepath: Collection) => JSXNodeType) => {
  const replaceWithModifiedAttributes = (nodepath: Collection) => {
    const newNode = deepCloneNode({ node: nodepath.get().node });

    if (nextProp) newNode.name.name = nextProp;
    if (nextValue) newNode.value.value = nextValue;

    return newNode;
  };
  return replaceWithModifiedAttributes;
};

/**
 * saveToSource: Saves the changes in the file  if the src object contains the 'modified: true' key-value
 */

const saveToSource = ({ src }: {| src: Collection |}): string | null =>
  src.modified ? src.toSource({ quote: 'double' }) : null;

export {
  buildReplaceWithModifiedAttributes,
  deepCloneNode,
  getGestaltImport,
  getComponentIdentifierByName,
  filterJSXByAttribute,
  getLocalImportedName,
  filterJSXByTargetLocalName,
  initialize,
  saveToSource,
};
