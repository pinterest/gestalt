/**
 * @fileoverview Encourage the use of Flex instead of Box
 *
 * We prefer using Flex over Box to better separate concerns and to encourage
 * the usage of `gap`. This linter checks for usage of Box that could be Flex
 * given the used props.
 */

// @flow strict
import { buildProps } from './eslintASTHelpers.js';
import { renameTagWithPropsFixer, updateGestaltImportFixer } from './eslintASTFixers.js';

const sharedProps = [
  'alignContent',
  'alignItems',
  'alignSelf',
  'children',
  'direction',
  'flex',
  'height',
  'justifyContent',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'overflow',
  'width',
  'wrap',
];

export const errorMessage =
  "Please use Flex for flexbox layouts. If you are wrapping children in Boxes to set margin/padding, try using Flex's `gap` prop instead!";

const rule = {
  meta: {
    docs: {
      description: 'Encourage usage of Flex instead of Box',
      recommended: false,
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        additionalProperties: false,
      },
    ],
  },

  // $FlowFixMe[unclear-type]
  create(context: Object): Object {
    let hasImportedBox = false;
    let gestaltImportStatement;
    let programNode;
    let isImportFixerExecuted = false;
    let hasAlignItems = false;
    let hasJustifyContent = false;
    let boxImportName;

    const importDeclaration = (decl) => {
      // Not a Gestalt import
      if (decl.source.value !== 'gestalt') {
        return;
      }

      hasImportedBox = decl.specifiers.some((node) => node.imported.name === 'Box');
      if (hasImportedBox) {
        const boxImportDeclaration = decl.specifiers.find((node) => node.imported.name === 'Box');
        // Hang on to the local name, we'll need this later
        boxImportName = boxImportDeclaration.local.name;
        gestaltImportStatement = decl;
      }
    };

    const jsxOpeningElement = (node) => {
      // We have no Boxes, or this is not a Box
      if (!hasImportedBox || node.name.name !== boxImportName) {
        return;
      }

      const props = node.attributes.map(({ name, value }) => ({
        key: name?.name,
        value: value?.value,
      }));

      const displayProp = props.find(({ key }) => key === 'display');
      // No `display` prop or not `display="flex"`
      if (!displayProp || displayProp.value !== 'flex') {
        return;
      }

      const notFlexProps = props
        .filter(({ key }) => key !== 'display')
        .filter(({ key }) => !sharedProps.includes(key));

      // Props are set that Flex doesn't support, needs to remain a Box
      if (notFlexProps.length > 0) {
        return;
      }

      if (props.map(({ key }) => key).includes('alignItems')) {
        hasAlignItems = true;
      }
      if (props.map(({ key }) => key).includes('justifyContent')) {
        hasJustifyContent = true;
      }

      context.report({
        node,
        message: errorMessage,
        fix: (fixer) => {
          // Are there other Box nodes aside from the one we're currently on?
          const hasOtherBoxes =
            programNode.tokens
              .filter(({ type }) => type === 'JSXIdentifier')
              .filter(({ value }) => value === boxImportName).length > 1;
          const importsToRemove = hasOtherBoxes ? [] : [boxImportName];

          // Update the import statement: add Flex if needed, remove Box if no longer needed
          const importFixers = updateGestaltImportFixer({
            fixer,
            gestaltImportNode: gestaltImportStatement,
            importsToRemove,
            newComponentName: 'Flex',
            programNode,
          });

          const additionalProps = [];
          // Make Box's defaults explicit since they differ from Flex's defaults
          if (!hasAlignItems) {
            additionalProps.push('alignItems="stretch"');
          }
          if (!hasJustifyContent) {
            additionalProps.push('justifyContent="start"');
          }

          // Replace the Box node with Flex, adding additional props if necessary
          const tagFixers = renameTagWithPropsFixer({
            additionalPropsString: buildProps({
              context,
              elementNode: node,
              newPropsString: additionalProps.join(' '),
              propsToRemove: ['display'],
            }),
            context,
            fixer,
            elementNode: node,
            newComponentName: 'Flex',
            tagName: 'Box',
          });

          const fixers = !isImportFixerExecuted ? [...tagFixers, importFixers] : tagFixers;
          isImportFixerExecuted = true;
          return fixers;
        },
      });
    };

    return {
      Program: (node) => {
        programNode = node;
      },
      ImportDeclaration: importDeclaration,
      JSXOpeningElement: jsxOpeningElement,
    };
  },
};

export default rule;
