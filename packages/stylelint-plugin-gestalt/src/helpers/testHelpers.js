import path from 'path';

export const getPathFormatterByRuleName = (ruleName) => (testPath) =>
  `./__fixtures__/${ruleName}/${testPath}.css`;

export function getTestByPath(codePath) {
  return path.resolve(__dirname, '..', codePath);
}
