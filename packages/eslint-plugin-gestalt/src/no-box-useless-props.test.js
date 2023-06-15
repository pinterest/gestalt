// @flow strict
import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import { parserOptions } from './helpers/testHelpers.js';
import rule, { errorMessages } from './no-box-useless-props.js';

const ruleTester = new RuleTester({ parserOptions });

const mapFileNameToPath = (pathPart: string) => (fileName: string) =>
  `./__fixtures__/no-box-useless-props/${pathPart}/${fileName}.js`;

function mapPathsToCode(codePath: string) {
  return readFileSync(path.resolve(__dirname, codePath), 'utf-8');
}

const validFitCodePaths = ['fit', 'fit-max-width'].map(mapFileNameToPath('valid'));
const validFitCode = validFitCodePaths.map(mapPathsToCode);
const invalidFitCodePaths = ['fit-max-width'].map(mapFileNameToPath('invalid'));
const invalidFitCode = invalidFitCodePaths.map(mapPathsToCode);

const validFlexCodePaths = [
  'flex-align-content',
  'flex-align-items',
  'flex-dangerous-grid',
  'flex-dangerous-inline-flex',
  'flex-dangerous-inline-grid',
  'flex-direction',
  'flex-dynamic-dangerous',
  'flex-dynamic-display',
  'flex-justify-content',
  'flex-reference-display',
  'flex-wrap',
].map(mapFileNameToPath('valid'));
const validFlexCode = validFlexCodePaths.map(mapPathsToCode);
const invalidFlexCodePaths = [
  'flex-align-content',
  'flex-align-items',
  'flex-dangerous',
  'flex-direction',
  'flex-dynamic-dangerous',
  'flex-dynamic-display',
  'flex-justify-content',
  'flex-wrap',
].map(mapFileNameToPath('invalid'));
const invalidFlexCode = invalidFlexCodePaths.map(mapPathsToCode);

ruleTester.run('no-box-useless-props', rule, {
  valid: [
    ...validFitCode.map((validCode) => ({ code: validCode })),
    ...validFlexCode.map((validCode) => ({ code: validCode })),
  ],
  invalid: [
    ...invalidFitCode.map((invalidCode) => ({
      code: invalidCode,
      errors: [{ message: errorMessages.fit }],
    })),
    ...invalidFlexCode.map((invalidCode) => ({
      code: invalidCode,
      errors: [{ message: errorMessages.flex }],
    })),
  ],
});
