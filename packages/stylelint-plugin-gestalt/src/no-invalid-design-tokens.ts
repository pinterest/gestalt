import stylelint from 'stylelint';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tokens = require('gestalt-design-tokens/dist/js/constants');

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

export const ruleName = 'stylelint-gestalt-plugin/no-invalid-design-tokens';

export const messages = ruleMessages(ruleName, {
  rejected: (tokenName) => `This design token is invalid: ${tokenName}`,
});

export const meta = {
  url: 'https://gestalt.pinterest.systems/get_started/developers/eslint_plugin',
} as const;

// @ts-expect-error - TS7006 - Parameter 'primary' implicitly has an 'any' type. | TS7006 - Parameter 'root' implicitly has an 'any' type. | TS7006 - Parameter 'result' implicitly has an 'any' type.
const ruleFunction: stylelint.Rule<any, any> = (primary) => (root, result) => {
  const validOptions = validateOptions(result, ruleName, {
    actual: primary,
    possible: [true],
  });

  const tokensValues = Object.entries(tokens);

  if (!validOptions) return; // If the options are invalid, don't lint

  root.walkDecls((ruleNode) => {
    const regex = /(var\(--(color|rounding|font|opacity|elevation|spacing)-[a-zA-Z0-9-]+?\))/;

    const match = ruleNode.value.match(regex);

    if (!match) return;

    const isValidGestaltToken = tokensValues.some(([, value]: [any, any]) => match[0] === value);

    if (isValidGestaltToken) return;

    report({
      result,
      ruleName,
      message: messages.rejected(match[0]),
      node: ruleNode,
    });
  });
};

export default createPlugin(ruleName, ruleFunction);
