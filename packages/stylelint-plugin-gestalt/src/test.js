// @flow strict
import stylelint from 'stylelint';

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const ruleName = 'selector-no-foo';

const messages = ruleMessages(ruleName, {
  rejected: (selector) => `Unexpected "foo" within selector "${selector}"`,
});

const meta = {
  url: 'https://github.com/stylelint-selector-no-foo/blob/main/README.md',
};

/** @type {import('stylelint').Rule} */
// $FlowFixMe[missing-local-annot]
const ruleFunction = (primary) => (root, result) => {
  const validOptions = validateOptions(result, ruleName, {
    actual: primary,
    possible: [true],
  });

  if (!validOptions) return;

  root.walkRules((ruleNode) => {
    const { selector } = ruleNode;

    if (!selector.includes('foo')) return;

    report({
      result,
      ruleName,
      message: messages.rejected(selector),
      node: ruleNode,
      word: selector,
    });
  });
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

// $FlowFixMe[signature-verification-failure]
export default createPlugin(ruleName, ruleFunction);
