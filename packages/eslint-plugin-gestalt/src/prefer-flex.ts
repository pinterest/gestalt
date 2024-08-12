/**
 * @fileoverview Encourage the use of Flex instead of Box
 *
 * We prefer using Flex over Box to better separate concerns and to encourage
 * the usage of `gap`. This linter checks for usage of Box that could be Flex
 * given the used props.
 */

import { renameTagWithPropsFixer, updateGestaltImportFixer } from './helpers/eslintASTFixers';
import { buildProps } from './helpers/eslintASTHelpers';
import { type ESLintRule } from './helpers/eslintFlowTypes';

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

const rule: ESLintRule = {
  meta: {
    docs: {
      description: 'Encourage usage of Flex instead of Box',
      category: 'Gestalt alternatives',
      recommended: true,
      url: 'https://gestalt.pinterest.systems/eslint%20plugin#gestaltprefer-flex',
    },

    fixable: 'code',
    messages: {
      disallowed: errorMessage,
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
      },
    ],
    type: 'suggestion',
  },

  create(context) {
    let hasImportedBox = false;
    let hasImportedFlex = false;
    // @ts-expect-error - TS7034 - Variable 'gestaltImportStatement' implicitly has type 'any' in some locations where its type cannot be determined.
    let gestaltImportStatement;
    // @ts-expect-error - TS7034 - Variable 'programNode' implicitly has type 'any' in some locations where its type cannot be determined.
    let programNode;
    let isImportFixerExecuted = false;
    let hasAlignItems = false;
    let hasJustifyContent = false;
    // @ts-expect-error - TS7034 - Variable 'boxImportName' implicitly has type 'any' in some locations where its type cannot be determined.
    let boxImportName;

    // @ts-expect-error - TS7006 - Parameter 'decl' implicitly has an 'any' type.
    const importDeclaration = (decl) => {
      // Not a Gestalt import
      if (decl.source.value !== 'gestalt') {
        return;
      }

      // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
      hasImportedBox = decl.specifiers.some((node) => node.imported.name === 'Box');
      // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
      hasImportedFlex = decl.specifiers.some((node) => node.imported.name === 'Flex');

      if (hasImportedBox) {
        // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
        const boxImportDeclaration = decl.specifiers.find((node) => node.imported.name === 'Box');
        // Hang on to the local name, we'll need this later
        boxImportName = boxImportDeclaration.local.name;
        gestaltImportStatement = decl;
      }
    };

    // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
    const jsxOpeningElement = (node) => {
      // We have no Boxes, or this is not a Box
      // @ts-expect-error - TS7005 - Variable 'boxImportName' implicitly has an 'any' type.
      if (!hasImportedBox || node.name.name !== boxImportName) {
        return;
      }

      // @ts-expect-error - TS7031 - Binding element 'name' implicitly has an 'any' type. | TS7031 - Binding element 'value' implicitly has an 'any' type.
      const props = node.attributes.map(({ name, value }) => ({
        key: name?.name,
        value: value?.value,
      }));

      // @ts-expect-error - TS7031 - Binding element 'key' implicitly has an 'any' type.
      const displayProp = props.find(({ key }) => key === 'display');
      // No `display` prop or not `display="flex"`
      if (!displayProp || displayProp.value !== 'flex') {
        return;
      }

      const notFlexProps = props
        // @ts-expect-error - TS7031 - Binding element 'key' implicitly has an 'any' type.
        .filter(({ key }) => key !== 'display')
        // @ts-expect-error - TS7031 - Binding element 'key' implicitly has an 'any' type.
        .filter(({ key }) => !sharedProps.includes(key));

      // Props are set that Flex doesn't support, needs to remain a Box
      if (notFlexProps.length > 0) {
        return;
      }

      // @ts-expect-error - TS7031 - Binding element 'key' implicitly has an 'any' type.
      if (props.map(({ key }) => key).includes('alignItems')) {
        hasAlignItems = true;
      }
      // @ts-expect-error - TS7031 - Binding element 'key' implicitly has an 'any' type.
      if (props.map(({ key }) => key).includes('justifyContent')) {
        hasJustifyContent = true;
      }

      context.report({
        node,
        messageId: 'disallowed',
        // @ts-expect-error - TS7006 - Parameter 'fixer' implicitly has an 'any' type.
        fix: (fixer) => {
          // Are there other Box nodes aside from the one we're currently on?
          // We can only get a count of tags without opening/closing info, and they're not paired.
          // This count is _before_ this fix runs, but _after_ previous fixes in the file have run (if applicable).
          // So first we'll determine how many tags are accounted for by the current node.
          const currentNodeTagCount = node.selfClosing ? 1 : 2;
          // Next we'll get a count of all the Box tags in the file
          // @ts-expect-error - TS7005 - Variable 'programNode' implicitly has an 'any' type.
          const boxTagsCount = programNode.tokens
            // @ts-expect-error - TS7031 - Binding element 'type' implicitly has an 'any' type.
            .filter(({ type }) => type === 'JSXIdentifier')
            // @ts-expect-error - TS7031 - Binding element 'value' implicitly has an 'any' type. | TS7005 - Variable 'boxImportName' implicitly has an 'any' type.
            .filter(({ value }) => value === boxImportName).length;
          // Once we remove the current node's tags from the overall Box count, are there Boxes left?
          // If so, we need to keep the Box import. Otherwise we can remove it.
          // @ts-expect-error - TS7005 - Variable 'boxImportName' implicitly has an 'any' type.
          const importsToRemove = boxTagsCount - currentNodeTagCount > 0 ? [] : [boxImportName];

          let renamedFlexImport;
          // If the file doesn't already import Flex and the Box import was renamed,
          // let's make a best-guess attempt at honoring that renaming
          // @ts-expect-error - TS7005 - Variable 'boxImportName' implicitly has an 'any' type. | TS7005 - Variable 'boxImportName' implicitly has an 'any' type.
          if (!hasImportedFlex && boxImportName !== 'Box' && boxImportName.includes('Box')) {
            // @ts-expect-error - TS7005 - Variable 'boxImportName' implicitly has an 'any' type.
            renamedFlexImport = boxImportName.replace('Box', 'Flex');
          }

          // Update the import statement: add Flex if needed, remove Box if no longer needed
          const importFixers = updateGestaltImportFixer({
            fixer,
            // @ts-expect-error - TS7005 - Variable 'gestaltImportStatement' implicitly has an 'any' type.
            gestaltImportNode: gestaltImportStatement,
            importsToRemove,
            newComponentName: renamedFlexImport ? `Flex as ${renamedFlexImport}` : 'Flex',
            // @ts-expect-error - TS7005 - Variable 'programNode' implicitly has an 'any' type.
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
            context,
            elementNode: node,
            fixer,
            // @ts-expect-error - TS7005 - Variable 'gestaltImportStatement' implicitly has an 'any' type.
            gestaltImportNode: gestaltImportStatement,
            modifiedPropsString: buildProps({
              context,
              elementNode: node,
              propsToAdd: additionalProps.join(' '),
              propsToRemove: ['display'],
            }),
            newComponentName: renamedFlexImport ?? 'Flex',
            tagName: 'Box',
          });

          const fixers = !isImportFixerExecuted ? [...tagFixers, importFixers] : tagFixers;
          isImportFixerExecuted = true;
          return fixers;
        },
      });
    };

    return {
      // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
      Program: (node) => {
        programNode = node;
      },
      ImportDeclaration: importDeclaration,
      JSXOpeningElement: jsxOpeningElement,
    };
  },
};

export default rule;
