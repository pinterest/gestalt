const tokens = require('gestalt-design-tokens/dist/js/constants');
const stylelint = require('stylelint');

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const ruleName = 'stylelint-gestalt-plugin/no-invalid-design-tokens';

const messages = ruleMessages(ruleName, {
  // @ts-expect-error - TS7006 - Parameter 'tokenName' implicitly has an 'any' type.
  rejected: (tokenName) => `This design token is invalid: ${tokenName}`,
});

const meta = {
  url: 'https://gestalt.pinterest.systems/get_started/developers/eslint_plugin',
} as const;

/** @type {import('stylelint').Rule} */
// @ts-expect-error - TS7006 - Parameter 'primary' implicitly has an 'any' type. | TS7006 - Parameter 'root' implicitly has an 'any' type. | TS7006 - Parameter 'result' implicitly has an 'any' type.
const ruleFunction = (primary) => (root, result) => {
  const validOptions = validateOptions(result, ruleName, {
    actual: primary,
    possible: [true],
  });

  const tokensValues = Object.entries(tokens);

  if (!validOptions) return; // If the options are invalid, don't lint

  // @ts-expect-error - TS7006 - Parameter 'ruleNode' implicitly has an 'any' type.
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

module.exports.ruleName = ruleName;
module.exports.messages = messages;
module.exports.meta = meta;

module.exports = createPlugin(ruleName, ruleFunction);
