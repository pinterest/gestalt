// @flow strict
import {
  type ApiType,
  type Collection,
  type FileType,
  type JSCodeShift,
  type JSXNodeType,
  type NodePathType,
} from './flowtypes.js';

/**
 *
 * IMPORTANT
 *
 * BEFORE YOU START DEVELOPING CODEMODS READ THE FOLLOWING DOCUMENTATION
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
 * isNullOrUndefined: Checks for values that are undefined or null
 */
const isNullOrUndefined = (value?: string | boolean | number): boolean =>
  value === undefined || value === null;

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
const getLocalImportedName = ({
  importSpecifierCollection,
}: {
  importSpecifierCollection: Collection,
  // $FlowFixMe[underconstrained-implicit-instantiation]
}): string => importSpecifierCollection.get(0).node.local?.name;

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
  subcomponent?: ?string,
|}): Collection =>
  subcomponent
    ? src.find(j.JSXElement, {
        openingElement: {
          name: { object: { name: targetLocalName }, property: { name: subcomponent } },
        },
      })
    : src.find(j.JSXElement, { openingElement: { name: { name: targetLocalName } } });

/**
 * checkComponentName: Checks if the name of the opening element of the parent node of the attribute node, which is the JSX element itself matches the componenent and subcomponent names.
 */
const checkComponentName = ({
  nodepath,
  componentName,
  subcomponentName,
}: {
  nodepath: NodePathType,
  componentName: string,
  subcomponentName: ?string,
}) =>
  subcomponentName
    ? nodepath.parentPath.parentPath.value.name?.object?.name === componentName &&
      nodepath.parentPath.parentPath.value.name?.property?.name === subcomponentName
    : nodepath.parentPath.parentPath.value.name?.name === componentName;

/**
 * filterJSXByAttribute: Returns a collection containing the Gestalt JSX components with matching prop/value attributes
 */
const filterJSXByAttribute = ({
  j,
  jSXCollection,
  componentName,
  subcomponentName,
  prop,
  value,
}: {
  j: JSCodeShift,
  jSXCollection: Collection,
  componentName: string,
  subcomponentName: ?string,
  prop: string,
  value?: string,
}): Collection => {
  if (typeof value === 'string') {
    return jSXCollection
      .find(j.JSXAttribute, { name: { name: prop }, value: { value } })
      .filter((nodepath) => checkComponentName({ nodepath, componentName, subcomponentName }));
  }

  if (typeof value === 'number') {
    return jSXCollection
      .find(j.JSXAttribute, {
        value: {
          type: 'JSXExpressionContainer',
          expression: {
            type: 'Literal',
            value,
          },
        },
      })
      .filter((nodepath) => checkComponentName({ nodepath, componentName, subcomponentName }));
  }

  if (typeof value === 'boolean') {
    return value
      ? jSXCollection
          .find(j.JSXAttribute, {
            value: null,
          })
          .filter((nodepath) => checkComponentName({ nodepath, componentName, subcomponentName }))
      : jSXCollection
          .find(j.JSXAttribute, {
            value: {
              type: 'JSXExpressionContainer',
              expression: {
                type: 'Literal',
                value,
              },
            },
          })
          .filter((nodepath) => checkComponentName({ nodepath, componentName, subcomponentName }));
  }

  if (!value)
    return jSXCollection
      .find(j.JSXAttribute, { name: { name: prop } })
      .filter((nodepath) => checkComponentName({ nodepath, componentName, subcomponentName }));

  return jSXCollection;
};

/**
 * deepCloneNode: Returns a cloned node of a node-path
 */
const deepCloneNode = <T>({ node }: { node: T }): T => JSON.parse(JSON.stringify(node) ?? '');

/**
 * buildAttributeFromValue: Returns a collection containing the Gestalt import declaration node-path
 */
const buildAttributeFromValue = ({
  j,
  prop,
  value,
}: {
  j: JSCodeShift,
  prop: string,
  value?: string | boolean | number,
}): ?JSXNodeType => {
  switch (typeof value) {
    case 'string':
      return j.jsxAttribute(j.jsxIdentifier(prop), j.stringLiteral(value));
    case 'number':
      return j.jsxAttribute(
        j.jsxIdentifier(prop),
        j.jsxExpressionContainer(j.numericLiteral(value)),
      );
    case 'boolean':
      return value
        ? j.jsxAttribute(j.jsxIdentifier(prop))
        : j.jsxAttribute(j.jsxIdentifier(prop), j.jsxExpressionContainer(j.booleanLiteral(value)));
    default:
      return null;
  }
};

/**
 * buildReplaceWithRenamedComponent: Returns a collection containing the Gestalt import declaration node-path
 */
const buildReplaceWithRenamedComponent = ({
  nextComponentName,
}: {
  nextComponentName: string,
}): ((nodepath: Collection) => ?JSXNodeType) => {
  const replaceWithRenamedComponent = (nodepath: Collection) => {
    // $FlowFixMe[underconstrained-implicit-instantiation]
    const newNode = deepCloneNode({ node: nodepath.get().node });

    newNode.openingElement.name.name = nextComponentName;
    if (!newNode.openingElement.selfClosing) {
      newNode.closingElement.name.name = nextComponentName;
    }
    return newNode;
  };

  return replaceWithRenamedComponent;
};

/**
 * buildReplaceWithRenamedComponent: Returns a callback for collection.replaceWith() that renames imported components
 */
const buildReplaceWithRenamedImport =
  ({ j, nextComponentName }: { j: JSCodeShift, nextComponentName: string }): (() => ?JSXNodeType) =>
  () =>
    j.importSpecifier(j.identifier(nextComponentName));

/**
 * buildReplaceWithModifiedAttributes: Returns a collection containing the Gestalt import declaration node-path
 */
const buildReplaceWithModifiedAttributes = ({
  j,
  previousProp,
  nextProp,
  nextValue,
}: {
  j: JSCodeShift,
  previousProp: string,
  nextProp?: string,
  nextValue?: string,
}): ((nodepath: Collection) => ?JSXNodeType) => {
  const replaceWithModifiedAttributes = (nodepath: Collection) => {
    // In the absence of nextProp & nextValue, we REMOVE prop and values
    if (!nextProp && isNullOrUndefined(nextValue)) return null;
    // $FlowFixMe[underconstrained-implicit-instantiation]
    let newNode = deepCloneNode({ node: nodepath.get().node });

    // In the absence of just nextValue, we rename the prop if both prop and value match.
    if (nextProp && isNullOrUndefined(nextValue)) newNode.name.name = nextProp;

    // In the presence of just nextProp, we change the value if there's a match.
    if (!nextProp && !isNullOrUndefined(nextValue)) {
      newNode = buildAttributeFromValue({ j, prop: previousProp, value: nextValue });
    }

    // In the presence of both nextProp and nextValue, we change both nextProp and nextValue if there's a match.
    if (nextProp && !isNullOrUndefined(nextValue)) {
      newNode = buildAttributeFromValue({ j, prop: nextProp, value: nextValue });
    }

    return newNode;
  };

  return replaceWithModifiedAttributes;
};

/**
 * throwErrorIfSpreadProps: Throws an error message if component contains spread props which are opaque to codemods
 * E.g. <Box {...props} /> // error!
 */
const throwErrorIfSpreadProps = ({
  fileInfo,
  j,
  jSXCollection,
  componentName,
  subcomponentName,
}: {
  fileInfo: FileType,
  j: JSCodeShift,
  jSXCollection: Collection,
  componentName: string,
  subcomponentName: ?string,
}): void => {
  const spreadPropsCollection = jSXCollection
    .find(j.JSXSpreadAttribute)
    .filter((nodepath) => checkComponentName({ nodepath, componentName, subcomponentName }));
  if (spreadPropsCollection.size() > 0) {
    throw new Error(
      `Remove dynamic properties and rerun codemod.\n${spreadPropsCollection
        .nodes()
        .map((node) => `Location: ${fileInfo.path} @line: ${node.loc.start.line}`)
        .join('\n')}`,
    );
  }
};

/**
 * throwErrorMessageWithNodesData: Throws an error message if collection isn't empty
 */
const throwErrorMessageWithNodesData = ({
  fileInfo,
  jSXCollection,
}: {
  fileInfo: FileType,
  jSXCollection: Collection,
}): void => {
  if (jSXCollection.size() > 0) {
    throw new Error(
      `This file requires manual attention. Follow the PR's instructions in the following code locations\n${jSXCollection
        .nodes()
        .map((node) => `Location: ${fileInfo.path} @line: ${node.loc.start.line}`)
        .join('\n')}`,
    );
  }
};

/**
 * saveToSource: Saves the changes in the file  if the src object contains the 'modified: true' key-value
 */
const saveToSource = ({ src }: {| src: Collection |}): string | null =>
  src.modified ? src.toSource({ quote: 'double' }) : null;

export {
  buildReplaceWithModifiedAttributes,
  buildReplaceWithRenamedComponent,
  buildReplaceWithRenamedImport,
  deepCloneNode,
  filterJSXByAttribute,
  filterJSXByTargetLocalName,
  getComponentIdentifierByName,
  getGestaltImport,
  getLocalImportedName,
  initialize,
  isNullOrUndefined,
  saveToSource,
  throwErrorIfSpreadProps,
  throwErrorMessageWithNodesData,
};
