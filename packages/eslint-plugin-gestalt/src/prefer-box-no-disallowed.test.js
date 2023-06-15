// @flow strict
import {
  getPathFormatterByRuleName,
  getRuleTester,
  getTestTypePrepender,
  readTestByPath,
} from './helpers/testHelpers.js';
import rule from './prefer-box-no-disallowed.js';

const ruleName = 'prefer-box-no-disallowed';
const ruleTester = getRuleTester();
const pathFormatter = getPathFormatterByRuleName(ruleName);
const validPrepender = getTestTypePrepender('valid');
const invalidPrependerLonelyRef = getTestTypePrepender('invalid-lonely-ref');
const invalidPrependerNoDisallowed = getTestTypePrepender('invalid-no-disallowed');

const validCode = readTestByPath(pathFormatter(validPrepender('valid')));

// lonely-ref
const buildInvalidTestLonelyRef = (name: string) =>
  readTestByPath(pathFormatter(invalidPrependerLonelyRef(name)));

const lonelyRefNoGestaltImportInput = buildInvalidTestLonelyRef('no-gestalt-import-input');
const lonelyRefNoGestaltImportOutput = buildInvalidTestLonelyRef('no-gestalt-import-output');
const lonelyRefNoGestaltImportSelfclosedInput = buildInvalidTestLonelyRef(
  'no-gestalt-import-selfclosed-input',
);
const lonelyRefNoGestaltImportSelfclosedOutput = buildInvalidTestLonelyRef(
  'no-gestalt-import-selfclosed-output',
);
const lonelyRefGestaltImportWithBoxInput = buildInvalidTestLonelyRef(
  'gestalt-import-with-box-input',
);
const lonelyRefGestaltImportWithBoxOutput = buildInvalidTestLonelyRef(
  'gestalt-import-with-box-output',
);
const lonelyRefGestaltImportWithRenamedBoxInput = buildInvalidTestLonelyRef(
  'gestalt-import-with-renamed-box-input',
);
const lonelyRefGestaltImportWithRenamedBoxOutput = buildInvalidTestLonelyRef(
  'gestalt-import-with-renamed-box-output',
);
const lonelyRefGestaltImportWithoutBoxInput = buildInvalidTestLonelyRef(
  'gestalt-import-without-box-input',
);
const lonelyRefGestaltImportWithoutBoxOutput = buildInvalidTestLonelyRef(
  'gestalt-import-without-box-output',
);

// no-disallowed
const buildInvalidTestNoDisallowed = (name: string) =>
  readTestByPath(pathFormatter(invalidPrependerNoDisallowed(name)));

const noDisallowedNoGestaltImportInput = buildInvalidTestNoDisallowed('no-gestalt-import-input');
const noDisallowedNoGestaltImportOutput = buildInvalidTestNoDisallowed('no-gestalt-import-output');
const noDisallowedNoGestaltImportSelfclosedInput = buildInvalidTestNoDisallowed(
  'no-gestalt-import-selfclosed-input',
);
const noDisallowedNoGestaltImportSelfclosedOutput = buildInvalidTestNoDisallowed(
  'no-gestalt-import-selfclosed-output',
);
const noDisallowedGestaltImportWithBoxInput = buildInvalidTestNoDisallowed(
  'gestalt-import-with-box-input',
);
const noDisallowedGestaltImportWithBoxOutput = buildInvalidTestNoDisallowed(
  'gestalt-import-with-box-output',
);
const noDisallowedGestaltImportWithBoxInlineStyleInput = buildInvalidTestNoDisallowed(
  'gestalt-import-with-box-inline-style-input',
);
const noDisallowedGestaltImportWithBoxInlineStyleOutput = buildInvalidTestNoDisallowed(
  'gestalt-import-with-box-inline-style-output',
);
const noDisallowedGestaltImportWithRenamedBoxInput = buildInvalidTestNoDisallowed(
  'gestalt-import-with-renamed-box-input',
);
const noDisallowedGestaltImportWithRenamedBoxOutput = buildInvalidTestNoDisallowed(
  'gestalt-import-with-renamed-box-output',
);
const noDisallowedGestaltImportWithoutBoxInput = buildInvalidTestNoDisallowed(
  'gestalt-import-without-box-input',
);
const noDisallowedGestaltImportWithoutBoxOutput = buildInvalidTestNoDisallowed(
  'gestalt-import-without-box-output',
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
