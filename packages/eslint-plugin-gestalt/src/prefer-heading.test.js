// @flow strict
import {
  getPathFormatterByRuleName,
  getRuleTester,
  getTestTypePrepender,
  readTestByPath,
} from './helpers/testHelpers.js';
import rule from './prefer-heading.js';

const ruleName = 'prefer-heading';
const ruleTester = getRuleTester();
const pathFormatter = getPathFormatterByRuleName(ruleName);
const validPrepender = getTestTypePrepender('valid');
const invalidPrependerNoDisallowed = getTestTypePrepender('invalid');

const validCode = readTestByPath(pathFormatter(validPrepender('valid')));

const buildInvalidTestNoDisallowed = (name) =>
  readTestByPath(pathFormatter(invalidPrependerNoDisallowed(name)));

const invalidNoGestaltImportInput = buildInvalidTestNoDisallowed('no-gestalt-import-input');
const invalidNoGestaltImportOutput = buildInvalidTestNoDisallowed('no-gestalt-import-output');
const invalidNoGestaltImportNoA11yLevelOutput = buildInvalidTestNoDisallowed(
  'no-gestalt-import-noA11yLevel-output',
);

const invalidNoGestaltImportH2nput = buildInvalidTestNoDisallowed('no-gestalt-import-h2-input');
const invalidNoGestaltImportH2Output = buildInvalidTestNoDisallowed('no-gestalt-import-h2-output');
const invalidNoGestaltImportNoA11yLevelH2Output = buildInvalidTestNoDisallowed(
  'no-gestalt-import-noA11yLevel-h2-output',
);

const invalidNoGestaltImportMultipleInput = buildInvalidTestNoDisallowed(
  'no-gestalt-import-multiple-input',
);
const invalidNoGestaltImportMultipleOutput = buildInvalidTestNoDisallowed(
  'no-gestalt-import-multiple-output',
);
const invalidNoGestaltImportNoA11yLevelMultipleOutput1 = buildInvalidTestNoDisallowed(
  'no-gestalt-import-noA11yLevel-multiple1-output',
);
const invalidNoGestaltImportNoA11yLevelMultipleOutput2 = buildInvalidTestNoDisallowed(
  'no-gestalt-import-noA11yLevel-multiple2-output',
);

const invalidGestaltImportInput = buildInvalidTestNoDisallowed('gestalt-import-input');
const invalidGestaltImportOutput = buildInvalidTestNoDisallowed('gestalt-import-output');
const invalidGestaltImportNoA11yLevelOutput = buildInvalidTestNoDisallowed(
  'gestalt-import-noA11yLevel-output',
);

ruleTester.run('prefer-heading', rule, {
  valid: [{ code: validCode }],
  invalid: [
    [
      invalidNoGestaltImportInput,
      invalidNoGestaltImportOutput,
      invalidNoGestaltImportNoA11yLevelOutput,
    ],
    [invalidGestaltImportInput, invalidGestaltImportOutput, invalidGestaltImportNoA11yLevelOutput],
    [
      invalidNoGestaltImportH2nput,
      invalidNoGestaltImportH2Output,
      invalidNoGestaltImportNoA11yLevelH2Output,
    ],
    [
      invalidNoGestaltImportMultipleInput,
      invalidNoGestaltImportMultipleOutput,
      invalidNoGestaltImportNoA11yLevelMultipleOutput1,
      invalidNoGestaltImportNoA11yLevelMultipleOutput2,
    ],
  ].map(([input, output, firstSuggestion, secondSuggestion]) => ({
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
