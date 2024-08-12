/**
 * @fileoverview Only valid tokens: prevent the consumption of Gestalt tokens via hard-coded strings p.e. var(--color-border-error). Instead import constant from 'gestalt-design-tokens' p.e. import { TOKEN_COLOR_BORDER_ERROR } from 'gestalt-design-tokens'.
 */

// @ts-expect-error - TS7016
import tokens from 'gestalt-design-tokens/dist/js/classic/constants';
import { getTextNodeFromSourceCode } from './helpers/eslintASTHelpers';
import { type ESLintRule } from './helpers/eslintFlowTypes';

const tokensValues = Object.entries(tokens);

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Only valid tokens: Import Gestalt tokens from gestalt-design-tokens rather than hard-coded strings',
      category: 'Gestalt alternatives',
      recommended: true,
      url: 'https://gestalt.pinterest.systems/eslint%20plugin#gestaltprefer-list',
    },
    schema: [] as ReadonlyArray<never>,
    fixable: 'code',
    messages: {
      invalidTokenString: `This string contains Gestalt hard-coded strings tokens: '{{ token }}'. Replace with equivalent constant: import { {{ replacement }} } from 'gestalt-design-tokens'.`,
    },
  },

  create(context) {
    // @ts-expect-error - TS7034 - Variable 'data' implicitly has type 'any' in some locations where its type cannot be determined.
    let data;
    return {
      // @ts-expect-error - TS7006 - Parameter 'programNode' implicitly has an 'any' type.
      Program(programNode) {
        // @ts-expect-error - TS7006 - Parameter 'nodeToken' implicitly has an 'any' type.
        programNode.tokens.forEach((nodeToken) => {
          if (
            (nodeToken.type === 'String' || nodeToken.type === 'Template') &&
            tokensValues.some(([key, value]) => {
              const match = typeof value === 'string' ? value.match(/var\(([^)]+)\)/) : null;

              const hasToken =
                typeof value === 'string' && match && match[1]
                  ? nodeToken.value.match(match[1])
                  : false;

              if (hasToken) {
                data = [key, value];
              }

              return hasToken;
            })
          ) {
            context.report({
              node: nodeToken,
              messageId: 'invalidTokenString',
              data: {
                // @ts-expect-error - TS7005 - Variable 'data' implicitly has an 'any' type.
                token: data?.[1],
                // @ts-expect-error - TS7005 - Variable 'data' implicitly has an 'any' type.
                replacement: data?.[0],
              },
              // @ts-expect-error - TS7006 - Parameter 'fixer' implicitly has an 'any' type.
              fix: (fixer) => {
                const importFixers = fixer.insertTextBefore(
                  programNode,
                  `import { ${
                    // @ts-expect-error - TS7005 - Variable 'data' implicitly has an 'any' type. | TS7005 - Variable 'data' implicitly has an 'any' type.
                    typeof data?.[0] === 'string' ? data?.[0] : ''
                  } } from 'gestalt-design-tokens';\n`,
                );

                const textFixer = fixer.replaceText(
                  nodeToken,
                  getTextNodeFromSourceCode({ context, elementNode: nodeToken }).replace(
                    /^/,
                    // @ts-expect-error - TS7005 - Variable 'data' implicitly has an 'any' type. | TS7005 - Variable 'data' implicitly has an 'any' type.
                    `\`\${${typeof data?.[0] === 'string' ? data?.[0] : ''}}\` + `,
                  ),
                );

                const fixers = [importFixers, textFixer];
                return fixers;
              },
            });
          }
        });
      },
    };
  },
};

export default rule;
