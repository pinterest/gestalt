// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule, { errorMessage } from './no-box-marginleft-marginright.js';
import { parserOptions } from './testHelpers.js';

const ruleTester = new RuleTester({ parserOptions });

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-box-marginleft-marginright/valid.js'),
  'utf-8',
);
const invalidLeftCode = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-box-marginleft-marginright/invalid/invalid-margin-left.js',
  ),
  'utf-8',
);
const invalidRightCode = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-box-marginleft-marginright/invalid/invalid-margin-right.js',
  ),
  'utf-8',
);
const invalidRightStartCode = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-box-marginleft-marginright/invalid/invalid-margin-right-margin-start.js',
  ),
  'utf-8',
);
const invalidLeftStartCode = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-box-marginleft-marginright/invalid/invalid-margin-left-margin-start.js',
  ),
  'utf-8',
);

ruleTester.run('no-box-marginleft-marginright', rule, {
  valid: [{ code: validCode }],
  invalid: [
    { code: invalidLeftCode, errors: [{ message: errorMessage }] },
    { code: invalidRightCode, errors: [{ message: errorMessage }] },
    { code: invalidRightStartCode, errors: [{ message: errorMessage }] },
    { code: invalidLeftStartCode, errors: [{ message: errorMessage }] },
  ],
});
