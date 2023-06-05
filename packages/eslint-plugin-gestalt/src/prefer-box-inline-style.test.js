// @flow strict
import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import rule from './prefer-box-inline-style.js';
import { parserOptions } from './helpers/testHelpers.js';

const ruleTester = new RuleTester({ parserOptions });

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box-inline-style/valid.js'),
  'utf-8',
);
const invalidBackgroundColor = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box-inline-style/invalid/backgroundColor.js'),
  'utf-8',
);
const invalidBorderRadius = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box-inline-style/invalid/borderRadius.js'),
  'utf-8',
);
const invalidBorder = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box-inline-style/invalid/border.js'),
  'utf-8',
);

const getErrorMessage = (string: string) =>
  `Replace this div with a Gestalt Box.\n  Use prop ${string} instead`;

ruleTester.run('prefer-box', rule, {
  valid: [{ code: validCode }],
  invalid: [
    [invalidBackgroundColor, '`color="default"`'],
    [invalidBorderRadius, '`rounding="circle"`'],
    [invalidBorder, '`borderStyle="lg"`'],
  ].map(([code, errorMessage]) => ({ code, errors: [{ message: getErrorMessage(errorMessage) }] })),
});
