// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule from './button-icon-restrictions.js';
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

const errorMessage = 'Buttons using iconEnd must use "arrow-down", color "white", and size "lg"';

ruleTester.run('button-icon-restrictions', rule, {
  valid: [validWithSize].map((code) => ({ code })),
  invalid: [invalidRenamed, invalidWrongIcon].map((code) => ({
    code,
    errors: [{ message: errorMessage }],
  })),
});
