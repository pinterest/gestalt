// @flow strict
import rule, { errorMessage } from './prefer-flex.js';
import {
  getPathFormatterByRuleName,
  getRuleTester,
  getTestTypePrepender,
  readTestByPath,
} from './testHelpers.js';

const ruleName = 'prefer-flex';
const ruleTester = getRuleTester();
const pathFormatter = getPathFormatterByRuleName(ruleName);

const validPrepender = getTestTypePrepender('valid');
const invalidPrepender = getTestTypePrepender('invalid');

const mapToValidTestName = (testName) => readTestByPath(pathFormatter(validPrepender(testName)));
const mapToInvalidTestName = (testName) =>
  readTestByPath(pathFormatter(invalidPrepender(testName)));

const validTests = ['display-flex', 'rounding'].map(mapToValidTestName);

const invalidSingleBoxTests = ['single-box.input', 'single-box.output'].map(mapToInvalidTestName);
const invalidMultipleBoxTests = ['multiple-box.input', 'multiple-box.output'].map(
  mapToInvalidTestName,
);
const invalidMultipleBoxRenamedTests = [
  'multiple-box-renamed.input',
  'multiple-box-renamed.output',
].map(mapToInvalidTestName);

ruleTester.run(ruleName, rule, {
  valid: validTests.map((code) => ({ code })),
  invalid: [invalidSingleBoxTests, invalidMultipleBoxTests, invalidMultipleBoxRenamedTests].map(
    ([input, output]) => ({
      code: input,
      output,
      errors: [{ message: errorMessage }],
    }),
  ),
});
