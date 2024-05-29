import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';

export const parserOptions = {
  sourceType: 'module',
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  },
} as const;

export const getRuleTester = (): RuleTester => new RuleTester({ parserOptions });

type Prepender = (arg1: string) => string;
export const getTestTypePrepender =
  (testType: string): Prepender =>
  (fileName) =>
    `${testType}/${fileName}.tsx`;

type Formatter = (arg1: string) => string;
export const getPathFormatterByRuleName =
  (ruleName: string): Formatter =>
  (testPath) =>
    `./__fixtures__/${ruleName}/${testPath}`;

export function readTestByPath(codePath: string): string {
  return readFileSync(path.resolve(__dirname, '..', codePath), 'utf-8');
}
