/**
 * @fileoverview Prefer Box: prevent <div> tags that don't contain disallowed attributes: className, onClick
 */

// @flow strict
import {
  isTag,
  hasAriaAttributes,
  hasAttributes,
  hasImport,
  hasLonelyAttribute,
} from './eslintASTHelpers.js';
import { renameTagFixer, updateGestaltImportFixer } from './eslintASTFixers.js';
import { type ESLintRule } from './eslintFlowTypes.js';

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        "Prefer Box: prevent <div> tags that don't contain disallowed attributes: className, onClick. Use Gestalt Box, instead",
      category: 'Gestalt alternatives',
      recommended: true,
      url: 'https://gestalt.pinterest.systems/Eslint%20Plugin#gestaltprefer-box-no-disallowed',
    },
    fixable: 'code',
    schema: ([]: $ReadOnlyArray<empty>),
    messages: {
      disallowedLonelyRef: `Use <Box ref={ref}></Box> or other Gestalt components that support ref.`,
      disallowed: `Use <Box></Box>.`,
    },
  },

  create(context) {
    let programNode;
    let gestaltImportNode;
    let importFixerRun = false;

    const importDeclarationFnc = (node) => {
      if (!node) return;

      const isGestaltImportNode = hasImport({ importNode: node, path: 'gestalt' });

      if (!isGestaltImportNode) return;

      gestaltImportNode = node;
    };

    const jSXElementFnc = (node) => {
      const disallowedAttributes = ['className', 'onClick'];
      const ignoreEslintPluginJsxA11yAttributes = [
        'role',
        'onMouseOver',
        'onMouseOut',
        'accessKey',
        'autoFocus',
        'tabIndex',
      ];

      const ignoreAttributes = [...disallowedAttributes, ...ignoreEslintPluginJsxA11yAttributes];
      if (
        !isTag({ elementNode: node.openingElement, tagName: 'div' }) ||
        hasAttributes({
          elementNode: node.openingElement,
          tagName: 'div',
          attributes: ignoreAttributes,
        }) ||
        hasAriaAttributes({
          elementNode: node.openingElement,
          tagName: 'div',
        })
      ) {
        return null;
      }

      if (
        hasLonelyAttribute({ elementNode: node.openingElement, tagName: 'div', attribute: 'ref' })
      ) {
        return context.report({
          node,
          messageId: 'disallowedLonelyRef',
          fix: (fixer) => {
            const tagFixers = renameTagFixer({
              context,
              elementNode: node,
              fixer,
              gestaltImportNode,
              newComponentName: 'Box',
              tagName: 'div',
            });

            const importFixers = updateGestaltImportFixer({
              context,
              gestaltImportNode,
              fixer,
              newComponentName: 'Box',
              programNode,
            });

            const fixers = !importFixerRun ? [...tagFixers, importFixers] : tagFixers;
            importFixerRun = true;
            return fixers;
          },
        });
      }

      // For any other div tag where there's neither className nor lonely ref attributes
      return context.report({
        node,
        messageId: 'disallowed',
        fix: (fixer) => {
          const tagFixers = renameTagFixer({
            context,
            elementNode: node,
            fixer,
            gestaltImportNode,
            newComponentName: 'Box',
            tagName: 'div',
            replaceRegexCallback: ({ input }) =>
              input.replace(
                new RegExp(/style={([\w \W \d \s]+)}/, 'i'), // regex expression to match style={{ [key]: values }}
                (match, p1) => `dangerouslySetInlineStyle={{ __style: ${p1} }}`, // replacer function p1 returns the match between '()' in the RegExp
              ),
          });

          const importFixers = updateGestaltImportFixer({
            context,
            gestaltImportNode,
            fixer,
            newComponentName: 'Box',
            programNode,
          });

          const fixers = !importFixerRun ? [...tagFixers, importFixers] : tagFixers;
          importFixerRun = true;
          return fixers;
        },
      });
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
