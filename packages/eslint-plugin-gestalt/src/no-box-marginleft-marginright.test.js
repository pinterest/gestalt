// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule, { errorMessage } from './no-box-marginleft-marginright.js';

const ruleTester = new RuleTester();

const parserOptions = {
  sourceType: 'module',
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  },
};

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
  valid: [
    {
      code: validCode,
      parserOptions,
    },
  ],
  invalid: [
    {
      code: invalidLeftCode,
      parserOptions,
      errors: [
        {
          message: errorMessage,
        },
      ],
    },
    {
      code: invalidRightCode,
      parserOptions,
      errors: [
        {
          message: errorMessage,
        },
      ],
    },
    {
      code: invalidRightStartCode,
      parserOptions,
      errors: [
        {
          message: errorMessage,
        },
      ],
    },
    {
      code: invalidLeftStartCode,
      parserOptions,
      errors: [
        {
          message: errorMessage,
        },
      ],
    },
  ],
});
