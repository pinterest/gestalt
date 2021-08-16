// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule from './prefer-box-no-classname.js';
import { parserOptions } from './testHelpers.js';

const ruleTester = new RuleTester({ parserOptions });

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box-no-classname/valid.js'),
  'utf-8',
);

// lonely-ref

const lonelyRefNoGestaltImportInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-lonely-ref/no-gestalt-import-input.js',
  ),
  'utf-8',
);

const lonelyRefNoGestaltImportOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-lonely-ref/no-gestalt-import-output.js',
  ),
  'utf-8',
);

const lonelyRefNoGestaltImportSelfclosedInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-lonely-ref/no-gestalt-import-selfclosed-input.js',
  ),
  'utf-8',
);

const lonelyRefNoGestaltImportSelfclosedOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-lonely-ref/no-gestalt-import-selfclosed-output.js',
  ),
  'utf-8',
);

const lonelyRefGestaltImportWithBoxInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-lonely-ref/gestalt-import-with-box-input.js',
  ),
  'utf-8',
);

const lonelyRefGestaltImportWithBoxOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-lonely-ref/gestalt-import-with-box-output.js',
  ),
  'utf-8',
);

const lonelyRefGestaltImportWithRenamedBoxInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-lonely-ref/gestalt-import-with-renamed-box-input.js',
  ),
  'utf-8',
);

const lonelyRefGestaltImportWithRenamedBoxOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-lonely-ref/gestalt-import-with-renamed-box-output.js',
  ),
  'utf-8',
);

const lonelyRefGestaltImportWithoutBoxInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-lonely-ref/gestalt-import-without-box-input.js',
  ),
  'utf-8',
);

const lonelyRefGestaltImportWithoutBoxOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-lonely-ref/gestalt-import-without-box-output.js',
  ),
  'utf-8',
);

// no-classname

const noClassnameNoGestaltImportInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-no-classname/no-gestalt-import-input.js',
  ),
  'utf-8',
);

const noClassnameNoGestaltImportOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-no-classname/no-gestalt-import-output.js',
  ),
  'utf-8',
);

const noClassnameNoGestaltImportSelfclosedInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-no-classname/no-gestalt-import-selfclosed-input.js',
  ),
  'utf-8',
);

const noClassnameNoGestaltImportSelfclosedOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-no-classname/no-gestalt-import-selfclosed-output.js',
  ),
  'utf-8',
);

const noClassnameGestaltImportWithBoxInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-no-classname/gestalt-import-with-box-input.js',
  ),
  'utf-8',
);

const noClassnameGestaltImportWithBoxOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-no-classname/gestalt-import-with-box-output.js',
  ),
  'utf-8',
);

const noClassnameGestaltImportWithBoxInlineStyleInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-no-classname/gestalt-import-with-box-inline-style-input.js',
  ),
  'utf-8',
);

const noClassnameGestaltImportWithBoxInlineStyleOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-no-classname/gestalt-import-with-box-inline-style-output.js',
  ),
  'utf-8',
);

const noClassnameGestaltImportWithRenamedBoxInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-no-classname/gestalt-import-with-renamed-box-input.js',
  ),
  'utf-8',
);

const noClassnameGestaltImportWithRenamedBoxOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-no-classname/gestalt-import-with-renamed-box-output.js',
  ),
  'utf-8',
);

const noClassnameGestaltImportWithoutBoxInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-no-classname/gestalt-import-without-box-input.js',
  ),
  'utf-8',
);

const noClassnameGestaltImportWithoutBoxOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-no-classname/invalid-no-classname/gestalt-import-without-box-output.js',
  ),
  'utf-8',
);

const errorMessageLonelyRef =
  'Use <Box ref={ref}></Box> or other Gestalt components that support ref.';
const errorMessageNoClassname = 'Use <Box></Box>.';

ruleTester.run('prefer-box-no-classname', rule, {
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
    // no-classname
    [noClassnameNoGestaltImportInput, noClassnameNoGestaltImportOutput, errorMessageNoClassname],
    [
      noClassnameGestaltImportWithBoxInlineStyleInput,
      noClassnameGestaltImportWithBoxInlineStyleOutput,
      errorMessageNoClassname,
    ],

    [
      noClassnameNoGestaltImportSelfclosedInput,
      noClassnameNoGestaltImportSelfclosedOutput,
      errorMessageNoClassname,
    ],
    [
      noClassnameGestaltImportWithBoxInput,
      noClassnameGestaltImportWithBoxOutput,
      errorMessageNoClassname,
    ],
    [
      noClassnameGestaltImportWithRenamedBoxInput,
      noClassnameGestaltImportWithRenamedBoxOutput,
      errorMessageNoClassname,
    ],
    [
      noClassnameGestaltImportWithoutBoxInput,
      noClassnameGestaltImportWithoutBoxOutput,
      errorMessageNoClassname,
    ],
  ].map(([input, output, errorMessage]) => ({
    code: input,
    output,
    errors: [{ message: errorMessage }],
  })),
});
