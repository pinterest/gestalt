// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule from './no-medium-formfields.js';

const ruleTester = new RuleTester();

const parserOptions = {
  sourceType: 'module',
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  },
};

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-medium-formfields/valid.js'),
  'utf-8',
);
const invalidTextfieldDefault = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-medium-formfields/invalid/invalid-textfield-default.js',
  ),
  'utf-8',
);
const invalidTextfieldMedium = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-medium-formfields/invalid/invalid-textfield-medium.js',
  ),
  'utf-8',
);
const invalidTextfieldRenamed = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-medium-formfields/invalid/invalid-textfield-renamed.js',
  ),
  'utf-8',
);
const invalidSearchFieldDefault = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-medium-formfields/invalid/invalid-searchfield-default.js',
  ),
  'utf-8',
);
const invalidSelectListDefault = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-medium-formfields/invalid/invalid-selectlist-default.js',
  ),
  'utf-8',
);

ruleTester.run('no-medium-formfields', rule, {
  valid: [
    {
      code: validCode,
      parserOptions,
    },
  ],
  invalid: [
    invalidTextfieldDefault,
    invalidTextfieldMedium,
    invalidTextfieldRenamed,
    invalidSearchFieldDefault,
    invalidSelectListDefault,
  ].map((code) => ({
    code,
    parserOptions,
    errors: [
      {
        message: 'Gestalt form fields should always have size="lg" set on them',
      },
    ],
  })),
});
