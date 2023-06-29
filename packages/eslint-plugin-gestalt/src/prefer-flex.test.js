// @flow strict
import {
  getPathFormatterByRuleName,
  getRuleTester,
  getTestTypePrepender,
  readTestByPath,
} from './helpers/testHelpers.js';
import rule, { errorMessage } from './prefer-flex.js';

const ruleName = 'prefer-flex';
const ruleTester = getRuleTester();
const pathFormatter = getPathFormatterByRuleName(ruleName);

const validPrepender = getTestTypePrepender('valid');
const invalidPrepender = getTestTypePrepender('invalid');

const mapToValidTestName = (testName: string) =>
  readTestByPath(pathFormatter(validPrepender(testName)));
const mapToInvalidTestName = (testName: string) =>
  readTestByPath(pathFormatter(invalidPrepender(testName)));

const validTests = ['display-flex', 'rounding'].map(mapToValidTestName);

const invalidSingleBoxTests = ['single-box.input', 'single-box.output'].map(mapToInvalidTestName);
const invalidMultipleBoxTests = ['multiple-box.input', 'multiple-box.output'].map(
  mapToInvalidTestName,
);
const invalidMultipleBoxWithChildrenTests = [
  'multiple-box-with-children.input',
  'multiple-box-with-children.output',
].map(mapToInvalidTestName);
const invalidMultipleBoxRenamedTests = [
  'multiple-box-renamed.input',
  'multiple-box-renamed.output',
].map(mapToInvalidTestName);
const invalidExistingFlexTests = ['existing-flex.input', 'existing-flex.output'].map(
  mapToInvalidTestName,
);
const invalidExistingFlexRenamedBoxTests = [
  'existing-flex-renamed-box.input',
  'existing-flex-renamed-box.output',
].map(mapToInvalidTestName);
const invalidExistingFlexRenamedFlexTests = [
  'existing-flex-renamed-flex.input',
  'existing-flex-renamed-flex.output',
].map(mapToInvalidTestName);
const invalidExistingFlexRenamedBoxFlexTests = [
  'existing-flex-renamed-box-flex.input',
  'existing-flex-renamed-box-flex.output',
].map(mapToInvalidTestName);

ruleTester.run(ruleName, rule, {
  valid: validTests.map((code) => ({ code })),
  invalid: [
    invalidSingleBoxTests,
    invalidMultipleBoxTests,
    invalidMultipleBoxWithChildrenTests,
    invalidMultipleBoxRenamedTests,
    invalidExistingFlexTests,
    invalidExistingFlexRenamedBoxTests,
    invalidExistingFlexRenamedFlexTests,
    invalidExistingFlexRenamedBoxFlexTests,
  ].map(([input, output]) => ({
    code: input,
    output,
    errors: [{ message: errorMessage }],
  })),
});
