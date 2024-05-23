import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import { parserOptions } from './helpers/testHelpers';
import rule, { errorMessage as defaultOutputMessage } from './no-workflow-status-icon';

const ruleTester = new RuleTester({ parserOptions });

/** Valid cases */
const noMatchColor = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-workflow-status-icon/valid/no-match-color.tsx'),
  'utf-8',
);

const noMatchIcon = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-workflow-status-icon/valid/no-match-icon.tsx'),
  'utf-8',
);

const noMatchSize = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-workflow-status-icon/valid/no-match-size.tsx'),
  'utf-8',
);

const renamedIcon = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-workflow-status-icon/valid/renamed-icon.tsx'),
  'utf-8',
);

/** Invalid cases */
const invalidDefaultSize = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-workflow-status-icon/invalid/default-size.tsx'),
  'utf-8',
);

const invalidMatchProperties = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-workflow-status-icon/invalid/match-properties.tsx'),
  'utf-8',
);

const invalidRenamedIcon = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-workflow-status-icon/invalid/renamed-icon.tsx'),
  'utf-8',
);

ruleTester.run('no-workflow-status-icon', rule, {
  valid: [noMatchColor, noMatchIcon, noMatchSize, renamedIcon],
  invalid: [
    [invalidDefaultSize, defaultOutputMessage],
    [invalidMatchProperties, defaultOutputMessage],
    [invalidRenamedIcon, defaultOutputMessage],
    // @ts-expect-error - TS2345 - Argument of type '([code, errorMessage]: [any, any]) => { code: any; errors: { message: any; }[]; }' is not assignable to parameter of type '(value: string[], index: number, array: string[][]) => { code: any; errors: { message: any; }[]; }'.
  ].map(([code, errorMessage]: [any, any]) => ({ code, errors: [{ message: errorMessage }] })),
});
