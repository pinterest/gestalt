/**
 * @fileoverview Prefer Box: prevent HTML tags supported in Box through the `as` prop
 */

import { renameTagWithPropsFixer, updateGestaltImportFixer } from './helpers/eslintASTFixers';
import { buildProps, getHtmlTag, hasImport } from './helpers/eslintASTHelpers';
import { type ESLintRule } from './helpers/eslintFlowTypes';

export const SUPPORTED_HTML_TAGS = [
  'article',
  'aside',
  'caption',
  'details',
  'figcaption',
  'figure',
  'footer',
  'header',
  'main',
  'nav',
  'section',
  'summary',
] as const;

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: `Prefer Box: prevent HTML tags supported in Box through the \`as\` prop: ${SUPPORTED_HTML_TAGS.join(
        ', ',
      )}, instead',
      category: 'Gestalt alternatives`,
      recommended: true,
      url: 'https://gestalt.pinterest.systems/eslint%20plugin#gestaltprefer-box-as-tag',
    },
    fixable: 'code',
    schema: [] as ReadonlyArray<never>,
    messages: {
      disallowed: `Use <Box as="{{ tagName }}"></Box>.`,
    },
  },

  create(context) {
    // @ts-expect-error - TS7034 - Variable 'programNode' implicitly has type 'any' in some locations where its type cannot be determined.
    let programNode;
    // @ts-expect-error - TS7034 - Variable 'gestaltImportNode' implicitly has type 'any' in some locations where its type cannot be determined.
    let gestaltImportNode;
    let isImportFixerExecuted = false;

    // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
    const importDeclarationFnc = (node) => {
      if (!node) return;

      const isGestaltImportNode = hasImport({ importNode: node, path: 'gestalt' });

      if (!isGestaltImportNode) return;

      gestaltImportNode = node;
    };

    // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
    const jSXElementFnc = (node) => {
      const tagName = getHtmlTag({ elementNode: node });

      // @ts-expect-error - TS2345 - Argument of type 'string' is not assignable to parameter of type '"summary" | "article" | "aside" | "caption" | "details" | "figcaption" | "figure" | "footer" | "header" | "main" | "nav" | "section"'.
      if (!SUPPORTED_HTML_TAGS.includes(tagName)) return null;

      return context.report({
        node,
        messageId: 'disallowed',
        data: { tagName },
        // @ts-expect-error - TS7006 - Parameter 'fixer' implicitly has an 'any' type.
        fix: (fixer) => {
          const tagFixers = renameTagWithPropsFixer({
            context,
            elementNode: node,
            fixer,
            // @ts-expect-error - TS7005 - Variable 'gestaltImportNode' implicitly has an 'any' type.
            gestaltImportNode,
            newComponentName: 'Box',
            modifiedPropsString: buildProps({
              context,
              elementNode: node,
              propsToAdd: `as="${tagName}"`,
            }),
            tagName,
          });

          const importFixers = updateGestaltImportFixer({
            fixer,
            // @ts-expect-error - TS7005 - Variable 'gestaltImportNode' implicitly has an 'any' type.
            gestaltImportNode,
            newComponentName: 'Box',
            // @ts-expect-error - TS7005 - Variable 'programNode' implicitly has an 'any' type.
            programNode,
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
      ImportDeclaration: importDeclarationFnc,
      JSXElement: jSXElementFnc,
    };
  },
};

export default rule;
