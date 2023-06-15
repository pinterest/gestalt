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

const buildInvalidTestNoDisallowed = (name: string) =>
  readTestByPath(pathFormatter(invalidPrependerNoDisallowed(name)));

const invalidImportSingleInput = buildInvalidTestNoDisallowed('no-gestalt-import-single-input');
const invalidImportSingleOutput = buildInvalidTestNoDisallowed('no-gestalt-import-single-output');
const invalidImportMultipleInput = buildInvalidTestNoDisallowed('no-gestalt-import-multiple-input');
const invalidImportMultipleOutput = buildInvalidTestNoDisallowed(
  'no-gestalt-import-multiple-output',
);
const invalidImportSingleTapAreaSuggestion = buildInvalidTestNoDisallowed(
  'no-gestalt-import-single-taparea-suggestion',
);
const invalidImportMultipleTapAreaSuggestion = buildInvalidTestNoDisallowed(
  'no-gestalt-import-multiple-taparea-suggestion',
);

ruleTester.run('prefer-link', rule, {
  valid: [{ code: validCode }],
  invalid: [
    [invalidImportSingleInput, invalidImportSingleOutput, invalidImportSingleTapAreaSuggestion],
    [
      invalidImportMultipleInput,
      invalidImportMultipleOutput,
      invalidImportMultipleTapAreaSuggestion,
    ],
  ].map(([input, output, suggestion]) => ({
    code: input,
    output,
    errors: [
      {
        messageId: 'fixMessageLink',
        suggestions: [
          {
            output: suggestion,
            messageId: 'suggestionMessageTapArea',
          },
        ],
      },
    ],
  })),
});
