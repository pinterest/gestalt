// @flow strict
import {
  hasImport,
  hasLonelyAttribute,
  renameTagFixer,
  updateGestaltImportFixer,
} from './eslintASTHelpers.js';
/**
 * @fileoverview Prefer Box: prevent <div> tags used to only contain ref
 * @author Alberto Carreras <acarreras@pinterest.com>
 */

const rule = {
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

  // $FlowFixMe[unclear-type]
  create(context: Object): Object {
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
              fixer,
              elementNode: node,
              context,
              tagName: 'div',
              gestaltName: 'Box',
            });

            const importFixers = updateGestaltImportFixer({
              context,
              fixer,
              gestaltImportNode,
              gestaltName: 'Box',
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
