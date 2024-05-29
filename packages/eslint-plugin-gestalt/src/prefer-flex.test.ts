import {
  getPathFormatterByRuleName,
  getRuleTester,
  getTestTypePrepender,
  readTestByPath,
} from './helpers/testHelpers';
import rule, { errorMessage } from './prefer-flex';

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
  valid: validTests.map((code: any) => ({ code })),
  invalid: [
    invalidSingleBoxTests,
    invalidMultipleBoxTests,
    invalidMultipleBoxWithChildrenTests,
    invalidMultipleBoxRenamedTests,
    invalidExistingFlexTests,
    invalidExistingFlexRenamedBoxTests,
    invalidExistingFlexRenamedFlexTests,
    invalidExistingFlexRenamedBoxFlexTests,
    // @ts-expect-error - TS2345 - Argument of type '([input, output]: [any, any]) => { code: any; output: any; errors: { message: string; }[]; }' is not assignable to parameter of type '(value: string[], index: number, array: string[][]) => { code: any; output: any; errors: { message: string; }[]; }'.
  ].map(([input, output]: [any, any]) => ({
    code: input,
    output,
    errors: [{ message: errorMessage }],
  })),
});
