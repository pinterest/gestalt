/**
 * @fileoverview Prefer Heading: Prevent heading tags (h1 ... h6), use Gestalt Heading, instead
 */

import {
  renameTagFixer,
  renameTagWithPropsFixer,
  updateGestaltImportFixer,
} from './helpers/eslintASTFixers';
import {
  getHtmlTag,
  hasAttributes,
  hasImport,
  hasSpreadAttributes,
  hasUnsupportedAttributes,
  isTag,
} from './helpers/eslintASTHelpers';
import { ESLintRule } from './helpers/eslintFlowTypes';

export const MESSAGES = {
  fixMessageHeading: `Use Heading from Gestalt with accessibilityLevel (default autofix):\n
  <Heading accessibilityLevel={| 1 | 2 | 3 | 4 | 5 | 6 |}>Text</Heading>\n
  OR Use a presentational Heading from Gestalt:\n
  <Heading accessibilityLevel="none">Text</Heading>\n
  'none' hides Heading from assistive technology: see suggested options below to autofix`,
  suggestionMessageA11yLevelNone: `Use a presentational Heading from Gestalt instead (accessibilityLevel="none")`,
} as const;

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
    // @ts-expect-error - TS7034 - Variable 'programNode' implicitly has type 'any' in some locations where its type cannot be determined.
    let programNode;
    // @ts-expect-error - TS7034 - Variable 'gestaltImportNode' implicitly has type 'any' in some locations where its type cannot be determined.
    let gestaltImportNode;
    let importFixerRun = false;
    const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
    const importDeclarationFnc = (node) => {
      if (!node) return;

      const isGestaltImportNode = hasImport({ importNode: node, path: 'gestalt' });

      if (!isGestaltImportNode) return;

      gestaltImportNode = node;
    };

    // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
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
        // @ts-expect-error - TS7006 - Parameter 'fixer' implicitly has an 'any' type.
        fix: (fixer) => {
          const tagFixers =
            a11yLevel === '1'
              ? renameTagFixer({
                  context,
                  elementNode: node,
                  fixer,
                  // @ts-expect-error - TS7005 - Variable 'gestaltImportNode' implicitly has an 'any' type.
                  gestaltImportNode,
                  newComponentName: 'Heading',
                  tagName: headingTag,
                })
              : renameTagWithPropsFixer({
                  context,
                  elementNode: node,
                  fixer,
                  // @ts-expect-error - TS7005 - Variable 'gestaltImportNode' implicitly has an 'any' type.
                  gestaltImportNode,
                  newComponentName: 'Heading',
                  modifiedPropsString: a11yLevelProp,
                  tagName: headingTag,
                });

          const importFixers = updateGestaltImportFixer({
            // @ts-expect-error - TS7005 - Variable 'gestaltImportNode' implicitly has an 'any' type.
            gestaltImportNode,
            fixer,
            newComponentName: 'Heading',
            // @ts-expect-error - TS7005 - Variable 'programNode' implicitly has an 'any' type.
            programNode,
          });

          const fixers = !importFixerRun ? [...tagFixers, importFixers] : tagFixers;
          importFixerRun = true;
          return fixers;
        },
        suggest: [
          {
            messageId: 'suggestionMessageA11yLevelNone',
            // @ts-expect-error - TS7006 - Parameter 'fixer' implicitly has an 'any' type.
            fix: (fixer) => {
              const tagFixers = renameTagWithPropsFixer({
                context,
                elementNode: node,
                fixer,
                // @ts-expect-error - TS7005 - Variable 'gestaltImportNode' implicitly has an 'any' type.
                gestaltImportNode,
                newComponentName: 'Heading',
                modifiedPropsString: a11yLevelNoneProp,
                tagName: headingTag,
              });

              const importFixers = updateGestaltImportFixer({
                // @ts-expect-error - TS7005 - Variable 'gestaltImportNode' implicitly has an 'any' type.
                gestaltImportNode,
                fixer,
                newComponentName: 'Heading',
                // @ts-expect-error - TS7005 - Variable 'programNode' implicitly has an 'any' type.
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
      // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
      Program: (node) => {
        programNode = node;
      },
      ImportDeclaration: importDeclarationFnc,
      JSXElement: jSXElementFnc,
    };
  },
};

export default rule;
