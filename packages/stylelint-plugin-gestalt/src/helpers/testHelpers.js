// @flow strict
import path from 'path';

type Formatter = (string) => string;
export const getPathFormatterByRuleName =
  (ruleName: string): Formatter =>
  (testPath) =>
    `./__fixtures__/${ruleName}/${testPath}.css`;

export function getTestByPath(codePath: string): string {
  return path.resolve(__dirname, '..', codePath);
}
