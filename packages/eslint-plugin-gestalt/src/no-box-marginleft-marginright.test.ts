import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import { parserOptions } from './helpers/testHelpers';
import rule, { errorMessage } from './no-box-marginleft-marginright';

const ruleTester = new RuleTester({ parserOptions });

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-box-marginleft-marginright/valid.tsx'),
  'utf-8',
);
const invalidLeftCode = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-box-marginleft-marginright/invalid/invalid-margin-left.tsx',
  ),
  'utf-8',
);
const invalidRightCode = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-box-marginleft-marginright/invalid/invalid-margin-right.tsx',
  ),
  'utf-8',
);
const invalidRightStartCode = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-box-marginleft-marginright/invalid/invalid-margin-right-margin-start.tsx',
  ),
  'utf-8',
);
const invalidLeftStartCode = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-box-marginleft-marginright/invalid/invalid-margin-left-margin-start.tsx',
  ),
  'utf-8',
);

ruleTester.run('no-box-marginleft-marginright', rule, {
  valid: [{ code: validCode }],
  invalid: [invalidLeftCode, invalidRightCode, invalidRightStartCode, invalidLeftStartCode].map(
    (code: any) => ({ code, errors: [{ message: errorMessage }] }),
  ),
});
