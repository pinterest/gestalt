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

const validDisplayFlex = readTestByPath(pathFormatter(validPrepender('display-flex')));
const validRounding = readTestByPath(pathFormatter(validPrepender('rounding')));

const invalidSingleBoxInput = readTestByPath(pathFormatter(invalidPrepender('single-box.input')));
const invalidSingleBoxOutput = readTestByPath(pathFormatter(invalidPrepender('single-box.output')));
const invalidMultipleBoxInput = readTestByPath(
  pathFormatter(invalidPrepender('multiple-box.input')),
);
const invalidMultipleBoxOutput = readTestByPath(
  pathFormatter(invalidPrepender('multiple-box.output')),
);
const invalidMultipleBoxRenamedInput = readTestByPath(
  pathFormatter(invalidPrepender('multiple-box-renamed.input')),
);
const invalidMultipleBoxRenamedOutput = readTestByPath(
  pathFormatter(invalidPrepender('multiple-box-renamed.output')),
);

ruleTester.run(ruleName, rule, {
  valid: [validDisplayFlex, validRounding].map((code) => ({ code })),
  invalid: [
    [invalidSingleBoxInput, invalidSingleBoxOutput],
    [invalidMultipleBoxInput, invalidMultipleBoxOutput],
    [invalidMultipleBoxRenamedInput, invalidMultipleBoxRenamedOutput],
  ].map(([input, output]) => ({
    code: input,
    output,
    errors: [{ message: errorMessage }],
  })),
});
