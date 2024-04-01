// @flow strict
import stylelint from 'stylelint';
import { getPathFormatterByRuleName, getTestByPath } from './helpers/testHelpers';
import rule from './no-invalid-design-tokens';

const fileName = 'no-invalid-design-tokens';
const pathFormatter = getPathFormatterByRuleName(fileName);
const invalidCode = getTestByPath(pathFormatter('invalid'));

const { lint } = stylelint;

it('valid', async () => {
  const validCode = '.foo { border-color: var(--color-gray-roboflow-400); }';

  const {
    results: [{ warnings, parseErrors }],
  } = await lint({
    code: validCode,
    config: {
      plugins: rule,
      rules: {
        'stylelint-gestalt-plugin/no-invalid-design-tokens': true,
      },
    },
  });

  expect(parseErrors).toHaveLength(0);
  expect(warnings).toHaveLength(0);
});

it('invalid', async () => {
  const {
    results: [{ warnings, parseErrors }],
  } = await lint({
    files: [invalidCode],
    config: {
      plugins: rule,
      rules: {
        'stylelint-gestalt-plugin/no-invalid-design-tokens': true,
      },
    },
  });

  const [{ text, line, column }] = warnings;

  expect(parseErrors).toHaveLength(0);
  expect(warnings).toHaveLength(1);

  expect(text).toBe('Unexpected "foo" within selector ".foo" (stylelint-gestalt-plugin/no-foo)');
  expect(line).toBe(1);
  expect(column).toBe(1);
});
