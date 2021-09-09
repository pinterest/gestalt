/**
 * @fileoverview Encourage the use of Flex instead of Box
 *
 * We prefer using Flex over Box to better separate concerns and to encourage
 * the usage of `gap`. This linter checks for usage of Box that could be Flex
 * given the used props.
 */

// @flow strict
import { buildProps } from './helpers/eslintASTHelpers.js';
import { renameTagWithPropsFixer, updateGestaltImportFixer } from './helpers/eslintASTFixers.js';
import { type ESLintRule } from './helpers/eslintFlowTypes.js';

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
      url: 'https://gestalt.pinterest.systems/Eslint%20Plugin#gestaltprefer-flex',
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
      hasImportedFlex = decl.specifiers.some((node) => node.imported.name === 'Flex');

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
        messageId: 'disallowed',
        fix: (fixer) => {
          // Are there other Box nodes aside from the one we're currently on?
          // We can only get a count of tags without opening/closing info, and they're not paired.
          // This count is _before_ this fix runs, but _after_ previous fixes in the file have run (if applicable).
          // So first we'll determine how many tags are accounted for by the current node.
          const currentNodeTagCount = node.selfClosing ? 1 : 2;
          // Next we'll get a count of all the Box tags in the file
          const boxTagsCount = programNode.tokens
            .filter(({ type }) => type === 'JSXIdentifier')
            .filter(({ value }) => value === boxImportName).length;
          // Once we remove the current node's tags from the overall Box count, are there Boxes left?
          // If so, we need to keep the Box import. Otherwise we can remove it.
          const importsToRemove = boxTagsCount - currentNodeTagCount > 0 ? [] : [boxImportName];

          let renamedFlexImport;
          // If the file doesn't already import Flex and the Box import was renamed,
          // let's make a best-guess attempt at honoring that renaming
          if (!hasImportedFlex && boxImportName !== 'Box' && boxImportName.includes('Box')) {
            renamedFlexImport = boxImportName.replace('Box', 'Flex');
          }

          // Update the import statement: add Flex if needed, remove Box if no longer needed
          const importFixers = updateGestaltImportFixer({
            fixer,
            gestaltImportNode: gestaltImportStatement,
            importsToRemove,
            newComponentName: renamedFlexImport ? `Flex as ${renamedFlexImport}` : 'Flex',
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
      Program: (node) => {
        programNode = node;
      },
      ImportDeclaration: importDeclaration,
      JSXOpeningElement: jsxOpeningElement,
    };
  },
};

export default rule;
