// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule, { errorMessages } from './no-box-useless-props.js';

const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
});

const mapFileNameToPath = (pathPart) => (fileName) => {
  return `./__fixtures__/no-box-useless-props/${pathPart}/${fileName}.js`;
};

function mapPathsToCode(codePath) {
  return readFileSync(path.resolve(__dirname, codePath), 'utf-8');
}

const absoluteFileNames = ['absolute-bottom', 'absolute-left', 'absolute-right', 'absolute-top'];
const validAbsoluteCodePaths = absoluteFileNames.map(mapFileNameToPath('valid'));
const validAbsoluteCode = validAbsoluteCodePaths.map(mapPathsToCode);
const invalidAbsoluteCodePaths = absoluteFileNames.map(mapFileNameToPath('invalid'));
const invalidAbsoluteCode = invalidAbsoluteCodePaths.map(mapPathsToCode);

const validFitCodePaths = ['fit', 'fit-max-width'].map(mapFileNameToPath('valid'));
const validFitCode = validFitCodePaths.map(mapPathsToCode);
const invalidFitCodePaths = ['fit-max-width'].map(mapFileNameToPath('invalid'));
const invalidFitCode = invalidFitCodePaths.map(mapPathsToCode);

const flexFileNames = [
  'flex-align-content',
  'flex-align-items',
  'flex-direction',
  'flex-justify-content',
  'flex-wrap',
];
const validFlexCodePaths = flexFileNames.map(mapFileNameToPath('valid'));
const validFlexCode = validFlexCodePaths.map(mapPathsToCode);
const invalidFlexCodePaths = flexFileNames.map(mapFileNameToPath('invalid'));
const invalidFlexCode = invalidFlexCodePaths.map(mapPathsToCode);

ruleTester.run('no-box-useless-props', rule, {
  valid: [
    ...validAbsoluteCode.map((validCode) => ({ code: validCode })),
    ...validFitCode.map((validCode) => ({ code: validCode })),
    ...validFlexCode.map((validCode) => ({ code: validCode })),
  ],
  invalid: [
    ...invalidAbsoluteCode.map((invalidCode) => ({
      code: invalidCode,
      errors: [{ message: errorMessages.absolute }],
    })),
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
