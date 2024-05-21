import {
  getPathFormatterByRuleName,
  getRuleTester,
  getTestTypePrepender,
  readTestByPath,
} from './helpers/testHelpers';
import rule from './prefer-heading';

const ruleName = 'prefer-heading';
const ruleTester = getRuleTester();
const pathFormatter = getPathFormatterByRuleName(ruleName);
const validPrepender = getTestTypePrepender('valid');
const invalidPrepender = getTestTypePrepender('invalid');

const validCode = readTestByPath(pathFormatter(validPrepender('valid')));

const buildInvalidTest = (name: string) => readTestByPath(pathFormatter(invalidPrepender(name)));

const invalidNoGestaltImportInput = buildInvalidTest('no-gestalt-import-input');
const invalidNoGestaltImportOutput = buildInvalidTest('no-gestalt-import-output');
const invalidNoGestaltImportNoA11yLevelSuggestionOutput = buildInvalidTest(
  'no-gestalt-import-noA11yLevel-suggestion-output',
);

const invalidNoGestaltImportH2nput = buildInvalidTest('no-gestalt-import-h2-input');
const invalidNoGestaltImportH2Output = buildInvalidTest('no-gestalt-import-h2-output');
const invalidNoGestaltImportNoA11yLevelSuggestionH2Output = buildInvalidTest(
  'no-gestalt-import-noA11yLevel-suggestion-h2-output',
);

const invalidNoGestaltImportMultipleInput = buildInvalidTest('no-gestalt-import-multiple-input');
const invalidNoGestaltImportMultipleOutput = buildInvalidTest('no-gestalt-import-multiple-output');
const invalidNoGestaltImportNoA11yLevelSuggestionMultipleOutput1 = buildInvalidTest(
  'no-gestalt-import-noA11yLevel-suggestion-multiple1-output',
);
const invalidNoGestaltImportNoA11yLevelSuggestionMultipleOutput2 = buildInvalidTest(
  'no-gestalt-import-noA11yLevel-suggestion-multiple2-output',
);

const invalidGestaltImportInput = buildInvalidTest('gestalt-import-input');
const invalidGestaltImportOutput = buildInvalidTest('gestalt-import-output');
const invalidGestaltImportNoA11yLevelSuggestionOutput = buildInvalidTest(
  'gestalt-import-noA11yLevel-suggestion-output',
);

ruleTester.run('prefer-heading', rule, {
  valid: [{ code: validCode }],
  invalid: [
    [
      invalidNoGestaltImportInput,
      invalidNoGestaltImportOutput,
      invalidNoGestaltImportNoA11yLevelSuggestionOutput,
    ],
    [
      invalidGestaltImportInput,
      invalidGestaltImportOutput,
      invalidGestaltImportNoA11yLevelSuggestionOutput,
    ],
    [
      invalidNoGestaltImportH2nput,
      invalidNoGestaltImportH2Output,
      invalidNoGestaltImportNoA11yLevelSuggestionH2Output,
    ],
    [
      invalidNoGestaltImportMultipleInput,
      invalidNoGestaltImportMultipleOutput,
      invalidNoGestaltImportNoA11yLevelSuggestionMultipleOutput1,
      invalidNoGestaltImportNoA11yLevelSuggestionMultipleOutput2,
    ],
    // @ts-expect-error - TS2345 - Argument of type '([input, output, firstSuggestion, secondSuggestion]: [any, any, any, any]) => { code: any; output: any; errors: { messageId: string; suggestions: { output: any; messageId: string; }[]; }[]; }' is not assignable to parameter of type '(value: string[], index: number, array: string[][]) => { code: any; output: any; errors: { messageId: string; suggestions: { output: any; messageId: string; }[]; }[]; }'.
  ].map(([input, output, firstSuggestion, secondSuggestion]: [any, any, any, any]) => ({
    code: input,
    output,
    errors: !secondSuggestion
      ? [
          {
            messageId: 'fixMessageHeading',
            suggestions: [
              {
                output: firstSuggestion,
                messageId: 'suggestionMessageA11yLevelNone',
              },
            ],
          },
        ]
      : [
          {
            messageId: 'fixMessageHeading',
            suggestions: [
              {
                output: firstSuggestion,
                messageId: 'suggestionMessageA11yLevelNone',
              },
            ],
          },
          {
            messageId: 'fixMessageHeading',
            suggestions: [
              {
                output: secondSuggestion,
                messageId: 'suggestionMessageA11yLevelNone',
              },
            ],
          },
        ],
  })),
});
