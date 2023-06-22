/**
 * @fileoverview Prefer Heading: Prevent heading tags (h1 ... h6), use Gestalt Heading, instead
 */

// @flow strict
import {
  renameTagFixer,
  renameTagWithPropsFixer,
  updateGestaltImportFixer,
} from './helpers/eslintASTFixers.js';
import {
  getHtmlTag,
  hasAttributes,
  hasImport,
  hasSpreadAttributes,
  hasUnsupportedAttributes,
  isTag,
} from './helpers/eslintASTHelpers.js';
import { type ESLintRule } from './helpers/eslintFlowTypes.js';

export const MESSAGES = {
  fixMessageHeading: `Use Heading from Gestalt with accessibilityLevel (default autofix):\n
  <Heading accessibilityLevel={| 1 | 2 | 3 | 4 | 5 | 6 |}>Text</Heading>\n
  OR Use a presentational Heading from Gestalt:\n
  <Heading accessibilityLevel="none">Text</Heading>\n
  'none' hides Heading from assistive technology: see suggested options below to autofix`,
  suggestionMessageA11yLevelNone: `Use a presentational Heading from Gestalt instead (accessibilityLevel="none")`,
};

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prefer Heading: Prevent heading tags (h1 ... h6), use Gestalt Heading, instead',
      category: 'Gestalt alternatives',
      recommended: true,
      url: 'https://gestalt.pinterest.systems/eslint%20plugin#gestaltprefer-link',
    },
    fixable: 'code',
    schema: [],
    messages: {
      fixMessageHeading: MESSAGES.fixMessageHeading,
      suggestionMessageA11yLevelNone: MESSAGES.suggestionMessageA11yLevelNone,
    },
    hasSuggestions: true,
  },

  create(context) {
    let programNode;
    let gestaltImportNode;
    let importFixerRun = false;
    const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    // $FlowFixMe[missing-local-annot]
    const importDeclarationFnc = (node) => {
      if (!node) return;

      const isGestaltImportNode = hasImport({ importNode: node, path: 'gestalt' });

      if (!isGestaltImportNode) return;

      gestaltImportNode = node;
    };

    // $FlowFixMe[missing-local-annot]
    const jSXElementFnc = (node) => {
      const headingDisallowedAttributes = ['className'];

      // First, exit if anchor tag should stay unmodified
      if (
        !isTag({ elementNode: node.openingElement, tagName: headingTags }) ||
        hasSpreadAttributes({ elementNode: node.openingElement }) ||
        hasAttributes({
          elementNode: node.openingElement,
          tagName: headingTags,
          attributes: headingDisallowedAttributes,
        }) ||
        hasUnsupportedAttributes({
          elementNode: node.openingElement,
          tagName: headingTags,
          supportedAttributes: [],
        })
      ) {
        return null;
      }

      const headingTag = getHtmlTag({ elementNode: node });
      const a11yLevel = headingTag.replace('h', '');
      const a11yLevelProp = `accessibilityLevel={${a11yLevel}}`;
      const a11yLevelNoneProp = `accessibilityLevel="none"`;

      // For any other anchor tag modification
      return context.report({
        node,
        messageId: 'fixMessageHeading',
        fix: (fixer) => {
          const tagFixers =
            a11yLevel === '1'
              ? renameTagFixer({
                  context,
                  elementNode: node,
                  fixer,
                  gestaltImportNode,
                  newComponentName: 'Heading',
                  tagName: headingTag,
                })
              : renameTagWithPropsFixer({
                  context,
                  elementNode: node,
                  fixer,
                  gestaltImportNode,
                  newComponentName: 'Heading',
                  modifiedPropsString: a11yLevelProp,
                  tagName: headingTag,
                });

          const importFixers = updateGestaltImportFixer({
            gestaltImportNode,
            fixer,
            newComponentName: 'Heading',
            programNode,
          });

          const fixers = !importFixerRun ? [...tagFixers, importFixers] : tagFixers;
          importFixerRun = true;
          return fixers;
        },
        suggest: [
          {
            messageId: 'suggestionMessageA11yLevelNone',
            fix: (fixer) => {
              const tagFixers = renameTagWithPropsFixer({
                context,
                elementNode: node,
                fixer,
                gestaltImportNode,
                newComponentName: 'Heading',
                modifiedPropsString: a11yLevelNoneProp,
                tagName: headingTag,
              });

              const importFixers = updateGestaltImportFixer({
                gestaltImportNode,
                fixer,
                newComponentName: 'Heading',
                programNode,
              });

              const fixers = [...tagFixers, importFixers];
              return fixers;
            },
          },
        ],
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
