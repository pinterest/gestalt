// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';

export const parserOptions = {
  sourceType: 'module',
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  },
};

// $FlowExpectedError[unclear-type]
export const getRuleTester = (): Class<any> => new RuleTester({ parserOptions });

type Prepender = (string) => string;
export const getTestTypePrepender = (testType: 'valid' | 'invalid'): Prepender => (fileName) =>
  `${testType}/${fileName}.js`;

type Formatter = (string) => string;
export const getPathFormatterByRuleName = (ruleName: string): Formatter => (testPath) => {
  return `./__fixtures__/${ruleName}/${testPath}`;
};

export function readTestByPath(codePath: string): string {
  return readFileSync(path.resolve(__dirname, codePath), 'utf-8');
}
