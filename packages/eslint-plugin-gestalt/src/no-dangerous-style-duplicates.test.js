// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule from './no-dangerous-style-duplicates.js';
import { parserOptions } from './testHelpers.js';

const ruleTester = new RuleTester({ parserOptions });

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-dangerous-style-duplicates/valid.js'),
  'utf-8',
);
const invalidMultiple = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-multiple.js',
  ),
  'utf-8',
);
const invalidInVariable = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-in-variable.js',
  ),
  'utf-8',
);
const invalidBackgroundColor = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-backgroundColor.js',
  ),
  'utf-8',
);
const invalidBottom = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-bottom.js'),
  'utf-8',
);
const invalidBorder = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-border.js'),
  'utf-8',
);
const invalidBoxShadow = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-boxShadow.js',
  ),
  'utf-8',
);
const invalidBorderRadius = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-borderRadius.js',
  ),
  'utf-8',
);
const invalidLeft = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-left.js'),
  'utf-8',
);
const invalidMarginNegative = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-margin-negative.js',
  ),
  'utf-8',
);
const invalidMarginLeft = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-marginLeft.js',
  ),
  'utf-8',
);
const invalidMarginTop = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-marginTop.js',
  ),
  'utf-8',
);
const invalidMaxHeight = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-maxHeight.js',
  ),
  'utf-8',
);
const invalidMaxWidth = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-maxWidth.js',
  ),
  'utf-8',
);
const invalidMinHeight = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-minHeight.js',
  ),
  'utf-8',
);
const invalidMinWidth = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-minWidth.js',
  ),
  'utf-8',
);
const invalidPadding = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-padding.js',
  ),
  'utf-8',
);
const invalidOpacity = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-opacity.js',
  ),
  'utf-8',
);
const invalidOverflow = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-overflow.js',
  ),
  'utf-8',
);
const invalidPosition = readFileSync(
  path.resolve(
    __dirname,
    './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-position.js',
  ),
  'utf-8',
);
const invalidTop = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-top.js'),
  'utf-8',
);
const invalidRight = readFileSync(
  path.resolve(__dirname, './__fixtures__/no-dangerous-style-duplicates/invalid/invalid-right.js'),
  'utf-8',
);

const getErrorMessage = (concat) =>
  `Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n${concat}`;

ruleTester.run('no-dangerous-style-duplicates', rule, {
  valid: [{ code: validCode }],
  invalid: [
    [
      invalidMultiple,
      `  Use prop \`color="white"\` instead\n  Instead of dangerously styling top, use the "top" boolean prop`,
    ],
    [
      invalidMultiple,
      '  Instead of dangerously styling top, use the "top" boolean prop',
      [{ onlyKeys: ['top'] }],
    ],
    [invalidInVariable, '  Use prop `color="white"` instead'],
    [invalidBackgroundColor, '  Use prop `color="white"` instead'],
    [invalidBorder, '  Use prop `borderStyle="lg"` instead'],
    [invalidBorderRadius, '  Use prop `rounding="circle"` instead'],
    [invalidBottom, '  Instead of dangerously styling bottom, use the "bottom" boolean prop'],
    [invalidLeft, '  Instead of dangerously styling left, use the "left" boolean prop'],
    [invalidMarginNegative, '  Use prop `margin={-2}` instead'],
    [invalidMarginLeft, '  Use prop `marginStart={2}` instead'],
    [invalidMarginTop, '  Use prop `marginTop={1}` instead'],
    [invalidMaxHeight, '  Use prop `maxHeight={pixels}` or `maxHeight="percentage%"` instead'],
    [invalidMaxWidth, '  Use prop `maxWidth={pixels}` or `maxWidth="percentage%"` instead'],
    [invalidMinHeight, '  Use prop `minHeight={pixels}` or `minHeight="percentage%"` instead'],
    [invalidMinWidth, '  Use prop `minWidth={pixels}` or `minWidth="percentage%"` instead'],
    [invalidPadding, '  Use prop `padding={0}` instead'],
    [invalidOpacity, '  Use prop `opacity={0.9}` instead'],
    [invalidOverflow, '  Use prop `overflow="auto"` instead'],
    [invalidPosition, '  Use prop `position="absolute"` instead'],
    [invalidTop, '  Instead of dangerously styling top, use the "top" boolean prop'],
    [invalidRight, '  Instead of dangerously styling right, use the "right" boolean prop'],
    [invalidBoxShadow, '  Use prop `borderStyle="shadow"` instead'],
  ].map(([code, errors, options]) => ({
    code,
    options: options ?? [],
    errors: [{ message: getErrorMessage(errors) }],
  })),
});
