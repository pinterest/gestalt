// @flow strict
import stylelint from 'stylelint';
import { getPathFormatterByRuleName, getTestByPath } from './helpers/testHelpers';
import rule from './no-invalid-design-tokens';

const fileName = 'no-invalid-design-tokens';
const pathFormatter = getPathFormatterByRuleName(fileName);

const validNonGestalt = getTestByPath(pathFormatter('valid-non-gestalt'));
const validCodeColor = getTestByPath(pathFormatter('valid-color'));
const validCodeRounding = getTestByPath(pathFormatter('valid-rounding'));
const invalidCodeColor = getTestByPath(pathFormatter('invalid-color'));
const invalidCodeRounding = getTestByPath(pathFormatter('invalid-rounding'));

const { lint } = stylelint;

it('valid non-Gestalt token', async () => {
  const {
    results: [{ warnings, parseErrors }],
  } = await lint({
    files: [validNonGestalt],
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

it('valid color', async () => {
  const {
    results: [{ warnings, parseErrors }],
  } = await lint({
    files: [validCodeColor],
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

it('valid rounding', async () => {
  const {
    results: [{ warnings, parseErrors }],
  } = await lint({
    files: [validCodeRounding],
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

it('invalid color', async () => {
  const {
    results: [{ warnings, parseErrors }],
  } = await lint({
    files: [invalidCodeColor],
    config: {
      plugins: rule,
      rules: {
        'stylelint-gestalt-plugin/no-invalid-design-tokens': true,
      },
    },
  });

  const [{ text, line }] = warnings;

  expect(parseErrors).toHaveLength(0);
  expect(warnings).toHaveLength(1);

  expect(text).toBe(
    'This design token is invalid: var(--color-gray-roboflow-420) (stylelint-gestalt-plugin/no-invalid-design-tokens)',
  );
  expect(line).toBe(2);
});

it('invalid rounding', async () => {
  const {
    results: [{ warnings, parseErrors }],
  } = await lint({
    files: [invalidCodeRounding],
    config: {
      plugins: rule,
      rules: {
        'stylelint-gestalt-plugin/no-invalid-design-tokens': true,
      },
    },
  });

  const [{ text, line }] = warnings;

  expect(parseErrors).toHaveLength(0);
  expect(warnings).toHaveLength(1);

  expect(text).toBe(
    'This design token is invalid: var(--rounding-140) (stylelint-gestalt-plugin/no-invalid-design-tokens)',
  );
  expect(line).toBe(2);
});
