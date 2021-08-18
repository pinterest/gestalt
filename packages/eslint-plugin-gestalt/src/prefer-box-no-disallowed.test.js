// @flow strict
import {
  getPathFormatterByRuleName,
  getRuleTester,
  getTestTypePrepender,
  readTestByPath,
} from './testHelpers.js';
import rule from './prefer-box-no-disallowed.js';

const ruleName = 'prefer-box-no-disallowed';
const ruleTester = getRuleTester();
const pathFormatter = getPathFormatterByRuleName(ruleName);
const validPrepender = getTestTypePrepender('valid');
const invalidPrependerLonelyRef = getTestTypePrepender('invalid-lonely-ref');
const invalidPrependerNoDisallowed = getTestTypePrepender('invalid-no-disallowed');

const validCode = readTestByPath(pathFormatter(validPrepender('valid')));

// lonely-ref

const lonelyRefNoGestaltImportInput = readTestByPath(
  pathFormatter(invalidPrependerLonelyRef('no-gestalt-import-input')),
);

const lonelyRefNoGestaltImportOutput = readTestByPath(
  pathFormatter(invalidPrependerLonelyRef('no-gestalt-import-output')),
);

const lonelyRefNoGestaltImportSelfclosedInput = readTestByPath(
  pathFormatter(invalidPrependerLonelyRef('no-gestalt-import-selfclosed-input')),
);

const lonelyRefNoGestaltImportSelfclosedOutput = readTestByPath(
  pathFormatter(invalidPrependerLonelyRef('no-gestalt-import-selfclosed-output')),
);

const lonelyRefGestaltImportWithBoxInput = readTestByPath(
  pathFormatter(invalidPrependerLonelyRef('gestalt-import-with-box-input')),
);

const lonelyRefGestaltImportWithBoxOutput = readTestByPath(
  pathFormatter(invalidPrependerLonelyRef('gestalt-import-with-box-output')),
);

const lonelyRefGestaltImportWithRenamedBoxInput = readTestByPath(
  pathFormatter(invalidPrependerLonelyRef('gestalt-import-with-renamed-box-input')),
);

const lonelyRefGestaltImportWithRenamedBoxOutput = readTestByPath(
  pathFormatter(invalidPrependerLonelyRef('gestalt-import-with-renamed-box-output')),
);

const lonelyRefGestaltImportWithoutBoxInput = readTestByPath(
  pathFormatter(invalidPrependerLonelyRef('gestalt-import-without-box-input')),
);

const lonelyRefGestaltImportWithoutBoxOutput = readTestByPath(
  pathFormatter(invalidPrependerLonelyRef('gestalt-import-without-box-output')),
);

// no-disallowed

const noDisallowedNoGestaltImportInput = readTestByPath(
  pathFormatter(invalidPrependerNoDisallowed('no-gestalt-import-input')),
);

const noDisallowedNoGestaltImportOutput = readTestByPath(
  pathFormatter(invalidPrependerNoDisallowed('no-gestalt-import-output')),
);

const noDisallowedNoGestaltImportSelfclosedInput = readTestByPath(
  pathFormatter(invalidPrependerNoDisallowed('no-gestalt-import-selfclosed-input')),
);

const noDisallowedNoGestaltImportSelfclosedOutput = readTestByPath(
  pathFormatter(invalidPrependerNoDisallowed('no-gestalt-import-selfclosed-output')),
);

const noDisallowedGestaltImportWithBoxInput = readTestByPath(
  pathFormatter(invalidPrependerNoDisallowed('gestalt-import-with-box-input')),
);

const noDisallowedGestaltImportWithBoxOutput = readTestByPath(
  pathFormatter(invalidPrependerNoDisallowed('gestalt-import-with-box-output')),
);

const noDisallowedGestaltImportWithBoxInlineStyleInput = readTestByPath(
  pathFormatter(invalidPrependerNoDisallowed('gestalt-import-with-box-inline-style-input')),
);

const noDisallowedGestaltImportWithBoxInlineStyleOutput = readTestByPath(
  pathFormatter(invalidPrependerNoDisallowed('gestalt-import-with-box-inline-style-output')),
);

const noDisallowedGestaltImportWithRenamedBoxInput = readTestByPath(
  pathFormatter(invalidPrependerNoDisallowed('gestalt-import-with-renamed-box-input')),
);

const noDisallowedGestaltImportWithRenamedBoxOutput = readTestByPath(
  pathFormatter(invalidPrependerNoDisallowed('gestalt-import-with-renamed-box-output')),
);

const noDisallowedGestaltImportWithoutBoxInput = readTestByPath(
  pathFormatter(invalidPrependerNoDisallowed('gestalt-import-without-box-input')),
);

const noDisallowedGestaltImportWithoutBoxOutput = readTestByPath(
  pathFormatter(invalidPrependerNoDisallowed('gestalt-import-without-box-output')),
);

const errorMessageLonelyRef =
  'Use <Box ref={ref}></Box> or other Gestalt components that support ref.';
const errorMessageNoDisallowed = 'Use <Box></Box>.';

ruleTester.run('prefer-box-no-disallowed', rule, {
  valid: [{ code: validCode }],
  invalid: [
    // lonely-ref
    [lonelyRefNoGestaltImportInput, lonelyRefNoGestaltImportOutput, errorMessageLonelyRef],
    [
      lonelyRefNoGestaltImportSelfclosedInput,
      lonelyRefNoGestaltImportSelfclosedOutput,
      errorMessageLonelyRef,
    ],
    [
      lonelyRefGestaltImportWithBoxInput,
      lonelyRefGestaltImportWithBoxOutput,
      errorMessageLonelyRef,
    ],
    [
      lonelyRefGestaltImportWithRenamedBoxInput,
      lonelyRefGestaltImportWithRenamedBoxOutput,
      errorMessageLonelyRef,
    ],
    [
      lonelyRefGestaltImportWithoutBoxInput,
      lonelyRefGestaltImportWithoutBoxOutput,
      errorMessageLonelyRef,
    ],
    // no-disallowed
    [noDisallowedNoGestaltImportInput, noDisallowedNoGestaltImportOutput, errorMessageNoDisallowed],
    [
      noDisallowedGestaltImportWithBoxInlineStyleInput,
      noDisallowedGestaltImportWithBoxInlineStyleOutput,
      errorMessageNoDisallowed,
    ],

    [
      noDisallowedNoGestaltImportSelfclosedInput,
      noDisallowedNoGestaltImportSelfclosedOutput,
      errorMessageNoDisallowed,
    ],
    [
      noDisallowedGestaltImportWithBoxInput,
      noDisallowedGestaltImportWithBoxOutput,
      errorMessageNoDisallowed,
    ],
    [
      noDisallowedGestaltImportWithRenamedBoxInput,
      noDisallowedGestaltImportWithRenamedBoxOutput,
      errorMessageNoDisallowed,
    ],
    [
      noDisallowedGestaltImportWithoutBoxInput,
      noDisallowedGestaltImportWithoutBoxOutput,
      errorMessageNoDisallowed,
    ],
  ].map(([input, output, errorMessage]) => ({
    code: input,
    output,
    errors: [{ message: errorMessage }],
  })),
});
