// @flow strict
import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import rule, { errorMessage, errorMessage2 } from './button-icon-restrictions';
import { parserOptions } from './helpers/testHelpers';

const ruleTester = new RuleTester({ parserOptions });

const validWithSize = readFileSync(
  path.resolve(__dirname, './__fixtures__/button-icon-restrictions/valid/valid-size'),
  'utf-8',
);
const invalidRenamed = readFileSync(
  path.resolve(__dirname, './__fixtures__/button-icon-restrictions/invalid/invalid-renamed'),
  'utf-8',
);
const invalidWrongIcon = readFileSync(
  path.resolve(__dirname, './__fixtures__/button-icon-restrictions/invalid/invalid-wrong-icon'),
  'utf-8',
);

const invalidWrongIconLinkRole = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/button-icon-restrictions/invalid/invalid-wrong-link-role-icon',
  ),
  'utf-8',
);

ruleTester.run('button-icon-restrictions', rule, {
  valid: [validWithSize].map((code) => ({ code })),
  invalid: [invalidRenamed, invalidWrongIcon].map((code) => ({
    code,
    errors: [{ message: errorMessage2 }],
  })),
});

ruleTester.run('button-icon-restrictions', rule, {
  valid: [validWithSize].map((code) => ({ code })),
  invalid: [invalidWrongIconLinkRole].map((code) => ({
    code,
    errors: [{ message: errorMessage }],
  })),
});
