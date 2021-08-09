// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule from './prefer-box-lonely-ref.js';
import { parserOptions } from './testHelpers.js';

const ruleTester = new RuleTester({ parserOptions });

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box-lonely-ref/valid.js'),
  'utf-8',
);

const noGestaltImportInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-lonely-ref/invalid/no-gestalt-import-input.js',
  ),
  'utf-8',
);

const noGestaltImportOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-lonely-ref/invalid/no-gestalt-import-output.js',
  ),
  'utf-8',
);

const noGestaltImportSelfclosedInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-lonely-ref/invalid/no-gestalt-import-selfclosed-input.js',
  ),
  'utf-8',
);

const noGestaltImportSelfclosedOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-lonely-ref/invalid/no-gestalt-import-selfclosed-output.js',
  ),
  'utf-8',
);

const gestaltImportWithBoxInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-lonely-ref/invalid/gestalt-import-with-box-input.js',
  ),
  'utf-8',
);

const gestaltImportWithBoxOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-lonely-ref/invalid/gestalt-import-with-box-output.js',
  ),
  'utf-8',
);

const gestaltImportWithRenamedBoxInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-lonely-ref/invalid/gestalt-import-with-renamed-box-input.js',
  ),
  'utf-8',
);

const gestaltImportWithRenamedBoxOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-lonely-ref/invalid/gestalt-import-with-renamed-box-output.js',
  ),
  'utf-8',
);

const gestaltImportWithoutBoxInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-lonely-ref/invalid/gestalt-import-without-box-input.js',
  ),
  'utf-8',
);

const gestaltImportWithoutBoxOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-lonely-ref/invalid/gestalt-import-without-box-output.js',
  ),
  'utf-8',
);

const errorMessage = 'Use <Box ref={ref}></Box> or other Gestalt components that support ref.';

ruleTester.run('prefer-box-lonely-ref', rule, {
  valid: [
    {
      code: validCode,
    },
  ],
  invalid: [
    [noGestaltImportInput, noGestaltImportOutput],
    [noGestaltImportSelfclosedInput, noGestaltImportSelfclosedOutput],
    [gestaltImportWithBoxInput, gestaltImportWithBoxOutput],
    [gestaltImportWithRenamedBoxInput, gestaltImportWithRenamedBoxOutput],
    [gestaltImportWithoutBoxInput, gestaltImportWithoutBoxOutput],
  ].map(([input, output]) => ({
    code: input,
    output,
    errors: [{ message: errorMessage }],
  })),
});
