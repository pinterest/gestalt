// @flow strict
import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import { parserOptions } from './helpers/testHelpers.js';
import rule from './no-spread-props.js';

const ruleTester = new RuleTester({ parserOptions });

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

const getErrorMessage = (cmp: string, index: number) =>
  `Prop spreading in Gestalt component ${cmp} is forbidden, write your props out instead. ${
    index === 0 ? 'Autofix available' : ''
  }`;

ruleTester.run('no-spread-props', rule, {
  valid: [{ code: validCode }],
  invalid: [
    [invalidFixableInput, invalidFixableOutput],
    [invalidNotFixableInput, invalidNotFixableOutput],
  ].map(([input, output], index) => ({
    code: input,
    output,
    errors: [
      { message: getErrorMessage('Box', index) },
      { message: getErrorMessage('RenamedBox', index) },
    ],
  })),
});
