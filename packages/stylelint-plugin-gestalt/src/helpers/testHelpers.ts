import path from 'path';

type Formatter = (arg1: string) => string;
export const getPathFormatterByRuleName =
  (ruleName: string): Formatter =>
  (testPath) =>
    `./__fixtures__/${ruleName}/${testPath}.css`;

export function getTestByPath(codePath: string): string {
  return path.resolve(__dirname, '..', codePath);
}
