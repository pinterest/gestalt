// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule from './button-icon-restrictions.js';
import { parserOptions } from './testHelpers.js';

const ruleTester = new RuleTester({ parserOptions });

const validWithSize = readFileSync(
  path.resolve(__dirname, './__fixtures__/button-icon-restrictions/valid/valid-size.js'),
  'utf-8',
);

const invalidMissingColor = readFileSync(
  path.resolve(__dirname, './__fixtures__/button-icon-restrictions/invalid/invalid-no-color.js'),
  'utf-8',
);
const invalidWrongColor = readFileSync(
  path.resolve(__dirname, './__fixtures__/button-icon-restrictions/invalid/invalid-wrong-color.js'),
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
const invalidWrongSize = readFileSync(
  path.resolve(__dirname, './__fixtures__/button-icon-restrictions/invalid/invalid-wrong-size.js'),
  'utf-8',
);
const invalidWithoutSize = readFileSync(
  path.resolve(__dirname, './__fixtures__/button-icon-restrictions/invalid/invalid-no-size.js'),
  'utf-8',
);

ruleTester.run('button-icon-restrictions', rule, {
  valid: [validWithSize].map((code) => ({
    code,
    parserOptions,
  })),
  invalid: [
    invalidMissingColor,
    invalidWrongColor,
    invalidRenamed,
    invalidWrongIcon,
    invalidWrongSize,
    invalidWithoutSize,
  ].map((code) => ({
    code,
    parserOptions,
    errors: [
      {
        message: 'Buttons using iconEnd must use "arrow-down", color "white", and size "lg"',
      },
    ],
  })),
});
