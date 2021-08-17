// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule from './prefer-box-no-disallowed.js';
import { parserOptions } from './testHelpers.js';

const ruleTester = new RuleTester({ parserOptions });

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box-no-disallowed/valid.js'),
  'utf-8',
);

// lonely-ref

const lonelyRefNoGestaltImportInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-lonely-ref/no-gestalt-import-input.js',
  ),
  'utf-8',
);

const lonelyRefNoGestaltImportOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-lonely-ref/no-gestalt-import-output.js',
  ),
  'utf-8',
);

const lonelyRefNoGestaltImportSelfclosedInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-lonely-ref/no-gestalt-import-selfclosed-input.js',
  ),
  'utf-8',
);

const lonelyRefNoGestaltImportSelfclosedOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-lonely-ref/no-gestalt-import-selfclosed-output.js',
  ),
  'utf-8',
);

const lonelyRefGestaltImportWithBoxInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-lonely-ref/gestalt-import-with-box-input.js',
  ),
  'utf-8',
);

const lonelyRefGestaltImportWithBoxOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-lonely-ref/gestalt-import-with-box-output.js',
  ),
  'utf-8',
);

const lonelyRefGestaltImportWithRenamedBoxInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-lonely-ref/gestalt-import-with-renamed-box-input.js',
  ),
  'utf-8',
);

const lonelyRefGestaltImportWithRenamedBoxOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-lonely-ref/gestalt-import-with-renamed-box-output.js',
  ),
  'utf-8',
);

const lonelyRefGestaltImportWithoutBoxInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-lonely-ref/gestalt-import-without-box-input.js',
  ),
  'utf-8',
);

const lonelyRefGestaltImportWithoutBoxOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-lonely-ref/gestalt-import-without-box-output.js',
  ),
  'utf-8',
);

// no-disallowed

const noDisallowedNoGestaltImportInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-no-disallowed/no-gestalt-import-input.js',
  ),
  'utf-8',
);

const noDisallowedNoGestaltImportOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-no-disallowed/no-gestalt-import-output.js',
  ),
  'utf-8',
);

const noDisallowedNoGestaltImportSelfclosedInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-no-disallowed/no-gestalt-import-selfclosed-input.js',
  ),
  'utf-8',
);

const noDisallowedNoGestaltImportSelfclosedOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-no-disallowed/no-gestalt-import-selfclosed-output.js',
  ),
  'utf-8',
);

const noDisallowedGestaltImportWithBoxInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-no-disallowed/gestalt-import-with-box-input.js',
  ),
  'utf-8',
);

const noDisallowedGestaltImportWithBoxOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-no-disallowed/gestalt-import-with-box-output.js',
  ),
  'utf-8',
);

const noDisallowedGestaltImportWithBoxWithOnclickInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-no-disallowed/gestalt-import-with-box-with-onclick-input.js',
  ),
  'utf-8',
);

const noDisallowedGestaltImportWithBoxWithOnclickOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-no-disallowed/gestalt-import-with-box-with-onclick-output.js',
  ),
  'utf-8',
);

const noDisallowedGestaltImportWithBoxInlineStyleInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-no-disallowed/gestalt-import-with-box-inline-style-input.js',
  ),
  'utf-8',
);

const noDisallowedGestaltImportWithBoxInlineStyleOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-no-disallowed/gestalt-import-with-box-inline-style-output.js',
  ),
  'utf-8',
);

const noDisallowedGestaltImportWithRenamedBoxInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-no-disallowed/gestalt-import-with-renamed-box-input.js',
  ),
  'utf-8',
);

const noDisallowedGestaltImportWithRenamedBoxOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-no-disallowed/gestalt-import-with-renamed-box-output.js',
  ),
  'utf-8',
);

const noDisallowedGestaltImportWithoutBoxInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-no-disallowed/gestalt-import-without-box-input.js',
  ),
  'utf-8',
);

const noDisallowedGestaltImportWithoutBoxOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-disallowed/invalid-no-disallowed/gestalt-import-without-box-output.js',
  ),
  'utf-8',
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
      noDisallowedGestaltImportWithBoxWithOnclickInput,
      noDisallowedGestaltImportWithBoxWithOnclickOutput,
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
