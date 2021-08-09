/**
 * @fileoverview Prefer Box: prevent <div> tags used to only contain ref
 */

// @flow strict
import { hasImport, hasLonelyAttribute } from './eslintASTHelpers.js';
import { renameTagFixer, updateGestaltImportFixer } from './eslintASTFixers.js';
import { type ESLintRule } from './eslintFlowTypes.js';

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prefer Box: prevent <div> tags used to only contain ref. Use Gestalt Box, instead',
      category: 'Gestalt alternatives',
      recommended: true,
      url: 'https://gestalt.pinterest.systems/Eslint%20Plugin#gestaltprefer-box-lonely-ref',
    },
    fixable: 'code',
    schema: ([]: $ReadOnlyArray<empty>),
    messages: {
      disallowed: `Use <Box ref={ref}></Box> or other Gestalt components that support ref.`,
    },
  },

  create(context) {
    let programNode;
    let gestaltImportNode;

    const importDeclarationFnc = (node) => {
      if (!node) return;

      const isGestaltImportNode = hasImport({ importNode: node, path: 'gestalt' });

      if (!isGestaltImportNode) return;

      gestaltImportNode = node;
    };

    const jSXElementFnc = (node) => {
      if (
        hasLonelyAttribute({ elementNode: node.openingElement, tagName: 'div', attribute: 'ref' })
      ) {
        context.report({
          node,
          messageId: 'disallowed',
          fix: (fixer) => {
            const tagFixers = renameTagFixer({
              context,
              fixer,
              elementNode: node,
              newComponentName: 'Box',
              tagName: 'div',
            });

            const importFixers = updateGestaltImportFixer({
              context,
              fixer,
              gestaltImportNode,
              newComponentName: 'Box',
              programNode,
            });

            return [...tagFixers, importFixers];
          },
        });
      }
    };

    return {
      Program: (node) => {
        programNode = node;
      },
      ImportDeclaration: importDeclarationFnc,
      JSXElement: jSXElementFnc,
    };
  },
};

export default rule;
