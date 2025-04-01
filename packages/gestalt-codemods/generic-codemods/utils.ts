import { NodePath } from 'ast-types/lib/node-path';
import { API, ASTPath, Collection, FileInfo, JSCodeshift } from 'jscodeshift/src/core';
import { describe } from 'jscodeshift-helper';

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
}: {
  api: API;
  fileInfo: FileInfo;
}): { j: JSCodeshift; src: Collection & { modified?: boolean } } => {
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
}: {
  j: JSCodeshift;
  gestaltImportCollection: Collection;
  componentName: string;
}): Collection =>
  gestaltImportCollection.find(j.ImportSpecifier, {
    imported: {
      type: 'Identifier',
      name: componentName,
    },
  });

/**
 * getGestaltImport: Returns a collection containing the Gestalt import declaration node-path
 */
const getGestaltImport = ({ src, j }: { src: Collection; j: JSCodeshift }): Collection =>
  src.find(j.ImportDeclaration, {
    source: {
      value: (value: string) => value.includes('gestalt'),
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
  importSpecifierCollection: Collection;
}): string => importSpecifierCollection.get(0).node.local?.name;

/**
 * filterJSXByTargetLocalName: Returns a collection containing the Gestalt JSX component matching the targetLocalName value
 */
const filterJSXByTargetLocalName = ({
  src,
  j,
  targetLocalName,
  subcomponent,
}: {
  src: Collection;
  j: JSCodeshift;
  targetLocalName: string;
  subcomponent?: string | null;
}): Collection =>
  subcomponent
    ? src.find(j.JSXElement, {
        openingElement: {
          name: {
            object: { name: targetLocalName },
            property: { name: subcomponent },
          },
        },
      })
    : src.find(j.JSXElement, {
        openingElement: { name: { name: targetLocalName } },
      });

/**
 * checkComponentName: Checks if the name of the opening element of the parent node of the attribute node, which is the JSX element itself matches the componenent and subcomponent names.
 */
const checkComponentName = ({
  nodepath,
  componentName,
  subcomponentName,
}: {
  nodepath: NodePath;
  componentName: string;
  subcomponentName?: string;
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
  j: JSCodeshift;
  jSXCollection: Collection;
  componentName: string;
  subcomponentName?: string;
  prop: string;
  value?: string | number | boolean;
}): Collection => {
  if (typeof value === 'string') {
    return jSXCollection
      .find(j.JSXAttribute, { name: { name: prop }, value: { value } })
      .filter((nodepath) => checkComponentName({ nodepath, componentName, subcomponentName }));
  }

  if (typeof value === 'number') {
    const a = jSXCollection
      .find(j.JSXAttribute, {
        value: {
          type: 'JSXExpressionContainer',
          expression: {
            type: 'NumericLiteral',
            value,
          },
        },
      })
      .filter((nodepath) => checkComponentName({ nodepath, componentName, subcomponentName }));
    describe(a);
    return a;
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
            name: { name: prop },
            value: {
              type: 'JSXExpressionContainer',
              expression: {
                type: 'BooleanLiteral',
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
 * buildAttributeFromValue: Returns a collection containing the Gestalt import declaration node-path
 */
const buildAttributeFromValue = ({
  j,
  prop,
  value,
}: {
  j: JSCodeshift;
  prop: string;
  value?: string | boolean | number;
}) => {
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
const buildReplaceWithRenamedComponent =
  ({
    nextComponentName,
  }: {
    nextComponentName: string;
  }): ((nodepath: ASTPath, i: number) => Collection) =>
  (nodepath: ASTPath) => {
    const { node } = nodepath.get();
    node.openingElement.name.name = nextComponentName;
    if (!node.openingElement.selfClosing) {
      node.closingElement.name.name = nextComponentName;
    }
    return node;
  };

/**
 * buildReplaceWithRenamedImport: Returns a callback for collection.replaceWith() that renames imported components
 */
const buildReplaceWithRenamedImport =
  ({ j, nextComponentName }: { j: JSCodeshift; nextComponentName: string }) =>
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
  j: JSCodeshift;
  previousProp: string;
  nextProp?: string;
  nextValue?: string;
}) => {
  const replaceWithModifiedAttributes = (nodepath: Collection) => {
    // In the absence of nextProp & nextValue, we REMOVE prop and values
    if (!nextProp && isNullOrUndefined(nextValue)) return null;
    let { node } = nodepath.get();

    // In the absence of just nextValue, we rename the prop if both prop and value match.
    if (nextProp && isNullOrUndefined(nextValue)) node.name.name = nextProp;

    // In the presence of just nextProp, we change the value if there's a match.
    if (!nextProp && !isNullOrUndefined(nextValue)) {
      node = buildAttributeFromValue({
        j,
        prop: previousProp,
        value: nextValue,
      });
    }

    // In the presence of both nextProp and nextValue, we change both nextProp and nextValue if there's a match.
    if (nextProp && !isNullOrUndefined(nextValue)) {
      node = buildAttributeFromValue({
        j,
        prop: nextProp,
        value: nextValue,
      });
    }

    return node;
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
  fileInfo: FileInfo;
  j: JSCodeshift;
  jSXCollection: Collection;
  componentName: string;
  subcomponentName?: string;
}): void => {
  const spreadPropsCollection = jSXCollection
    .find(j.JSXSpreadAttribute)
    .filter((nodepath) => checkComponentName({ nodepath, componentName, subcomponentName }));
  if (spreadPropsCollection.size() > 0) {
    throw new Error(
      `Remove dynamic properties and rerun codemod.\n${spreadPropsCollection
        .nodes()
        .map((node) => `Location: ${fileInfo.path} @line: ${node.loc?.start.line}`)
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
  fileInfo: FileInfo;
  jSXCollection: Collection;
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
const saveToSource = ({ src }: { src: Collection & { modified?: boolean } }): string | null =>
  src.modified ? src.toSource({ quote: 'double' }) : null;

export {
  buildAttributeFromValue,
  buildReplaceWithModifiedAttributes,
  buildReplaceWithRenamedComponent,
  buildReplaceWithRenamedImport,
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
