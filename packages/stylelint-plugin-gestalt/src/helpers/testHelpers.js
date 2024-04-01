// @flow strict
import path from 'path';

export const parserOptions = {
  sourceType: 'module',
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  },
};

type Formatter = (string) => string;
export const getPathFormatterByRuleName =
  (ruleName: string): Formatter =>
  (testPath) =>
    `./__fixtures__/${ruleName}/${testPath}.css`;

export function getTestByPath(codePath: string): string {
  return path.resolve(__dirname, '..', codePath);
}
