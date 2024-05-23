import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import { parserOptions } from './helpers/testHelpers';
import rule from './prefer-box-inline-style';

const ruleTester = new RuleTester({ parserOptions });

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box-inline-style/valid.tsx'),
  'utf-8',
);
const invalidBackgroundColor = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box-inline-style/invalid/backgroundColor.tsx'),
  'utf-8',
);
const invalidBorderRadius = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box-inline-style/invalid/borderRadius.tsx'),
  'utf-8',
);
const invalidBorder = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box-inline-style/invalid/border.tsx'),
  'utf-8',
);

const getErrorMessage = (string: string) =>
  `Replace this div with a Gestalt Box.\n  Use prop ${string} instead`;

ruleTester.run('prefer-box', rule, {
  valid: [{ code: validCode }],
  invalid: [
    [invalidBackgroundColor, '`color="default"`'],
    [invalidBorderRadius, '`rounding="circle"`'],
    [invalidBorder, '`borderStyle="lg"`'],
    // @ts-expect-error - TS2345 - Argument of type '([code, errorMessage]: [any, any]) => { code: any; errors: { message: string; }[]; }' is not assignable to parameter of type '(value: string[], index: number, array: string[][]) => { code: any; errors: { message: string; }[]; }'.
  ].map(([code, errorMessage]: [any, any]) => ({
    code,
    errors: [{ message: getErrorMessage(errorMessage) }],
  })),
});
