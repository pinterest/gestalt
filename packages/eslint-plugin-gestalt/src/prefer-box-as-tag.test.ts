import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import { parserOptions } from './helpers/testHelpers';
import rule, { SUPPORTED_HTML_TAGS } from './prefer-box-as-tag';

const ruleTester = new RuleTester({ parserOptions });

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box-as-tag/valid.tsx'),
  'utf-8',
);

const gestaltImportHTMLMultipleTagWithPropsInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-as-tag/invalid/gestalt-import-HTML-multiple-tag-with-props-input.tsx',
  ),
  'utf-8',
);

const gestaltImportHTMLMultipleTagWithPropsOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-as-tag/invalid/gestalt-import-HTML-multiple-tag-with-props-output.tsx',
  ),
  'utf-8',
);

const gestaltImportHTMLSingleTagInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-as-tag/invalid/gestalt-import-HTML-single-tag-input.tsx',
  ),
  'utf-8',
);

const gestaltImportHTMLSingleTagOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-as-tag/invalid/gestalt-import-HTML-single-tag-output.tsx',
  ),
  'utf-8',
);

const noGestaltImportHTMLSingleTagInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-as-tag/invalid/no-gestalt-import-HTML-single-tag-input.tsx',
  ),
  'utf-8',
);

const noGestaltImportHTMLSingleTagOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-as-tag/invalid/no-gestalt-import-HTML-single-tag-output.tsx',
  ),
  'utf-8',
);

const multipleErrorMessage = SUPPORTED_HTML_TAGS.map((tag: any) => `Use <Box as="${tag}"></Box>.`);
const sameErrorMessage = Array(3).fill(`Use <Box as="article"></Box>.`);

ruleTester.run('prefer-box-as-tag', rule, {
  valid: [{ code: validCode }],
  invalid: [
    [noGestaltImportHTMLSingleTagInput, noGestaltImportHTMLSingleTagOutput, sameErrorMessage],
    [gestaltImportHTMLSingleTagInput, gestaltImportHTMLSingleTagOutput, sameErrorMessage],
    [
      gestaltImportHTMLMultipleTagWithPropsInput,
      gestaltImportHTMLMultipleTagWithPropsOutput,
      multipleErrorMessage,
    ],
    // @ts-expect-error - TS2345 - Argument of type '([input, output, errors]: [any, any, any]) => { code: any; output: any; errors: any; }' is not assignable to parameter of type '(value: (string | any[])[], index: number, array: (string | any[])[][]) => { code: any; output: any; errors: any; }'.
  ].map(([input, output, errors]: [any, any, any]) => ({ code: input, output, errors })),
});
