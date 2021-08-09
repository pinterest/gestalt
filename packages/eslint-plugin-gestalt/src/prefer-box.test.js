// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule from './prefer-box.js';
import { parserOptions } from './testHelpers.js';

const ruleTester = new RuleTester({ parserOptions });

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box/valid.js'),
  'utf-8',
);
const invalidBackgroundColor = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box/invalid/invalid-backgroundColor.js'),
  'utf-8',
);
const invalidBorderRadius = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box/invalid/invalid-borderRadius.js'),
  'utf-8',
);
const invalidBorder = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box/invalid/invalid-border.js'),
  'utf-8',
);

const getErrorMessage = (string) =>
  `Replace this div with a Gestalt Box.\n  Use prop ${string} instead`;

ruleTester.run('prefer-box', rule, {
  valid: [{ code: validCode }],
  invalid: [
    [invalidBackgroundColor, '`color="white"`'],
    [invalidBorderRadius, '`rounding="circle"`'],
    [invalidBorder, '`borderStyle="lg"`'],
  ].map(([code, errorMessage]) => ({ code, errors: [{ message: getErrorMessage(errorMessage) }] })),
});
