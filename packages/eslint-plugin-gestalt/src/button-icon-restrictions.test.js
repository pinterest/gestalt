// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule, { errorMessage, errorMessage2 } from './button-icon-restrictions.js';
import { parserOptions } from './helpers/testHelpers.js';

const ruleTester = new RuleTester({ parserOptions });

const validWithSize = readFileSync(
  path.resolve(__dirname, './__fixtures__/button-icon-restrictions/valid/valid-size.js'),
  'utf-8',
);
const invalidRenamed = readFileSync(
  path.resolve(__dirname, './__fixtures__/button-icon-restrictions/invalid/invalid-renamed.js'),
  'utf-8',
);
const invalidWrongIcon = readFileSync(
  path.resolve(__dirname, './__fixtures__/button-icon-restrictions/invalid/invalid-wrong-icon.js'),
  'utf-8',
);

const invalidWrongIconLinkRole = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/button-icon-restrictions/invalid/invalid-wrong-link-role-icon.js',
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
