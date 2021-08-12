// @flow strict
import { RuleTester } from 'eslint';
import rule, { errorMessage } from './prefer-flex.js';
import { getPathFormatterByRuleName, parserOptions, readTestByPath } from './testHelpers.js';

const ruleName = 'prefer-flex';
const ruleTester = new RuleTester({ parserOptions });
const pathFormatter = getPathFormatterByRuleName(ruleName);

const validDisplayFlex = readTestByPath(pathFormatter('valid-display-flex.js'));
const validRounding = readTestByPath(pathFormatter('valid-rounding.js'));
const invalid = readTestByPath(pathFormatter('invalid.js'));

ruleTester.run(ruleName, rule, {
  valid: [validDisplayFlex, validRounding].map((code) => ({ code })),
  invalid: [invalid].map((code) => ({
    code,
    errors: [{ message: errorMessage }],
  })),
});
