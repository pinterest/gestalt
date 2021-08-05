// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule from './no-spread-props.js';

const ruleTester = new RuleTester();

const parserOptions = {
  sourceType: 'module',
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  },
};

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-spread-props/valid.js'),
  'utf-8',
);
const invalidFixableInput = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-spread-props/invalid-fixable-input.js'),
  'utf-8',
);

const invalidFixableOutput = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-spread-props/invalid-fixable-output.js'),
  'utf-8',
);
const invalidNotFixableInput = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-spread-props/invalid-not-fixable-input.js'),
  'utf-8',
);

const invalidNotFixableOutput = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-spread-props/invalid-not-fixable-output.js'),
  'utf-8',
);

ruleTester.run('no-spread-props', rule, {
  valid: [
    {
      code: validCode,
      parserOptions,
    },
  ],
  invalid: [
    [invalidFixableInput, invalidFixableOutput],
    [invalidNotFixableInput, invalidNotFixableOutput],
  ].map((code, index) => ({
    code: code[0],
    parserOptions,
    output: code[1],
    errors: [
      {
        message: `Prop spreading in Gestalt component 'Box' is forbidden, write your props out instead. ${
          index === 0 ? 'Autofix available' : ''
        }`,
      },
      {
        message: `Prop spreading in Gestalt component 'RenamedBox' is forbidden, write your props out instead. ${
          index === 0 ? 'Autofix available' : ''
        }`,
      },
    ],
  })),
});
