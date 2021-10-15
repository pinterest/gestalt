// @flow strict
import {
  getPathFormatterByRuleName,
  getRuleTester,
  getTestTypePrepender,
  readTestByPath,
} from './helpers/testHelpers.js';
import rule from './prefer-link.js';

const ruleName = 'prefer-link';
const ruleTester = getRuleTester();
const pathFormatter = getPathFormatterByRuleName(ruleName);
const validPrepender = getTestTypePrepender('valid');
const invalidPrependerNoDisallowed = getTestTypePrepender('invalid');

const validCode = readTestByPath(pathFormatter(validPrepender('valid')));

const buildInvalidTestNoDisallowed = (name) =>
  readTestByPath(pathFormatter(invalidPrependerNoDisallowed(name)));

const invalidImportInput = buildInvalidTestNoDisallowed('no-gestalt-import-input');
const invalidImportOutput = buildInvalidTestNoDisallowed('no-gestalt-import-output');

const errorMessageNoDisallowed = `Use <Link href="">Text</Link>.`;

ruleTester.run('prefer-link', rule, {
  valid: [{ code: validCode }],
  invalid: [[invalidImportInput, invalidImportOutput, errorMessageNoDisallowed]].map(
    ([input, output, errorMessage]) => ({
      code: input,
      output,
      errors: [{ message: errorMessage }],
    }),
  ),
});
