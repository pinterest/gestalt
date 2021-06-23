// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule, { errorMessage } from './prefer-flex.js';

const ruleTester = new RuleTester();

const parserOptions = {
  sourceType: 'module',
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  },
};

const validDisplayFlex = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-flex/valid-display-flex.js'),
  'utf-8',
);
const validRounding = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-flex/valid-rounding.js'),
  'utf-8',
);
const invalid = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-flex/invalid.js'),
  'utf-8',
);

ruleTester.run('prefer-flex', rule, {
  valid: [
    {
      code: validDisplayFlex,
      parserOptions,
    },
    {
      code: validRounding,
      parserOptions,
    },
  ],
  invalid: [
    {
      code: invalid,
      parserOptions,
      errors: [
        {
          message: errorMessage,
        },
      ],
    },
  ],
});
