// @flow strict
import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import { parserOptions } from './helpers/testHelpers.js';
import rule, { SUPPORTED_HTML_TAGS } from './prefer-box-as-tag.js';

const ruleTester = new RuleTester({ parserOptions });

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-box-as-tag/valid.js'),
  'utf-8',
);

const gestaltImportHTMLMultipleTagWithPropsInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-as-tag/invalid/gestalt-import-HTML-multiple-tag-with-props-input.js',
  ),
  'utf-8',
);

const gestaltImportHTMLMultipleTagWithPropsOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-as-tag/invalid/gestalt-import-HTML-multiple-tag-with-props-output.js',
  ),
  'utf-8',
);

const gestaltImportHTMLSingleTagInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-as-tag/invalid/gestalt-import-HTML-single-tag-input.js',
  ),
  'utf-8',
);

const gestaltImportHTMLSingleTagOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-as-tag/invalid/gestalt-import-HTML-single-tag-output.js',
  ),
  'utf-8',
);

const noGestaltImportHTMLSingleTagInput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-as-tag/invalid/no-gestalt-import-HTML-single-tag-input.js',
  ),
  'utf-8',
);

const noGestaltImportHTMLSingleTagOutput = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/prefer-box-as-tag/invalid/no-gestalt-import-HTML-single-tag-output.js',
  ),
  'utf-8',
);

const multipleErrorMessage = SUPPORTED_HTML_TAGS.map((tag) => `Use <Box as="${tag}"></Box>.`);
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
  ].map(([input, output, errors]) => ({ code: input, output, errors })),
});
