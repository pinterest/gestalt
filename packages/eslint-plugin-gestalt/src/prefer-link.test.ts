import {
  getPathFormatterByRuleName,
  getRuleTester,
  getTestTypePrepender,
  readTestByPath,
} from './helpers/testHelpers';
import rule from './prefer-link';

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
// @ts-expect-error - TS2345 - Argument of type '([input, output, suggestion]: [any, any, any]) => { code: any; output: any; errors: { messageId: string; suggestions: { output: any; messageId: string; }[]; }[]; }' is not assignable to parameter of type '(value: string[], index: number, array: string[][]) => { code: any; output: any; errors: { messageId: string; suggestions: { output: any; messageId: string; }[]; }[]; }'.
  ].map(([input, output, suggestion]: [any, any, any]) => ({
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
