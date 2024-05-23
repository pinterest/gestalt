import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import { parserOptions } from './helpers/testHelpers';
import rule from './no-role-link-components';

const ruleTester = new RuleTester({ parserOptions });

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-role-link-components/valid.tsx'),
  'utf-8',
);
const invalidButton = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-role-link-components/invalid/invalid-button.tsx'),
  'utf-8',
);
const invalidIconButton = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-role-link-components/invalid/invalid-iconbutton.tsx'),
  'utf-8',
);
const invalidTapArea = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-role-link-components/invalid/invalid-taparea.tsx'),
  'utf-8',
);

const getErrorMessage = (cmp: string) =>
  `${cmp} Components with role-link are disallowed in Pinboard. Please use app/common/react/ui/${cmp}Link.tsx instead.`;

ruleTester.run('no-role-link-components', rule, {
  valid: [{ code: validCode }],
  invalid: [
    [invalidButton, 'Button'],
    [invalidIconButton, 'IconButton'],
    [invalidTapArea, 'TapArea'],
    // @ts-expect-error - TS2345 - Argument of type '([code, errorMessage]: [any, any]) => { code: any; errors: { message: string; }[]; }' is not assignable to parameter of type '(value: string[], index: number, array: string[][]) => { code: any; errors: { message: string; }[]; }'.
  ].map(([code, errorMessage]: [any, any]) => ({
    code,
    errors: [{ message: getErrorMessage(errorMessage) }],
  })),
});
