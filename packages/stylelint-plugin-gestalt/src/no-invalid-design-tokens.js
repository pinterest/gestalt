// @flow strict
import stylelint from 'stylelint';
import tokens from 'gestalt-design-tokens/dist/js/constants';

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const ruleName = 'stylelint-gestalt-plugin/no-invalid-design-tokens';

const messages = ruleMessages(ruleName, {
  rejected: (tokenName) => `This design token is invalid: ${tokenName}`,
});

const meta = {
  url: 'https://gestalt.pinterest.systems/get_started/developers/eslint_plugin',
};

/** @type {import('stylelint').Rule} */
// $FlowFixMe[missing-local-annot]
const ruleFunction = (primary) => (root, result) => {
  const validOptions = validateOptions(result, ruleName, {
    actual: primary,
    possible: [true],
  });

  const tokensValues = Object.entries(tokens);

  if (!validOptions) return; // If the options are invalid, don't lint

  root.walkDecls((ruleNode) => {
    const match = ['color', 'font', 'rounding', 'elevation', 'opacity', 'spacing'].some(
      (category) => ruleNode.value.startsWith(`var(--${category}`),
    );

    if (!match) return;

    const isValid = tokensValues.some(([, value]) => ruleNode.value === value);

    if (isValid) return;

    report({
      result,
      ruleName,
      message: messages.rejected(ruleNode.value),
      node: ruleNode,
      word: 'hi',
    });
  });
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

// $FlowFixMe[signature-verification-failure]
export default createPlugin(ruleName, ruleFunction);
