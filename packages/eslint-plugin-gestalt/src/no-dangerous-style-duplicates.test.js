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

ruleTester.run('no-dangerous-style-duplicates', rule, {
  valid: [{ code: validCode }],
  invalid: [
    {
      code: invalidMultiple,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Use prop `color="white"` instead\n' +
            '  Instead of dangerously styling top, use the "top" boolean prop',
        },
      ],
    },
    {
      code: invalidMultiple,
      options: [
        {
          onlyKeys: ['top'],
        },
      ],
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Instead of dangerously styling top, use the "top" boolean prop',
        },
      ],
    },
    {
      code: invalidInVariable,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Use prop `color="white"` instead',
        },
      ],
    },
    {
      code: invalidBackgroundColor,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Use prop `color="white"` instead',
        },
      ],
    },
    {
      code: invalidBorder,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Use prop `borderStyle="lg"` instead',
        },
      ],
    },
    {
      code: invalidBorderRadius,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Use prop `rounding="circle"` instead',
        },
      ],
    },
    {
      code: invalidBottom,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Instead of dangerously styling bottom, use the "bottom" boolean prop',
        },
      ],
    },
    {
      code: invalidLeft,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Instead of dangerously styling left, use the "left" boolean prop',
        },
      ],
    },
    {
      code: invalidMarginNegative,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Use prop `margin={-2}` instead',
        },
      ],
    },
    {
      code: invalidMarginLeft,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Use prop `marginStart={2}` instead',
        },
      ],
    },
    {
      code: invalidMarginTop,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Use prop `marginTop={1}` instead',
        },
      ],
    },
    {
      code: invalidMaxHeight,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Use prop `maxHeight={pixels}` or `maxHeight="percentage%"` instead',
        },
      ],
    },
    {
      code: invalidMaxWidth,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Use prop `maxWidth={pixels}` or `maxWidth="percentage%"` instead',
        },
      ],
    },
    {
      code: invalidMinHeight,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Use prop `minHeight={pixels}` or `minHeight="percentage%"` instead',
        },
      ],
    },
    {
      code: invalidMinWidth,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Use prop `minWidth={pixels}` or `minWidth="percentage%"` instead',
        },
      ],
    },
    {
      code: invalidPadding,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Use prop `padding={0}` instead',
        },
      ],
    },
    {
      code: invalidOpacity,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Use prop `opacity={0.9}` instead',
        },
      ],
    },
    {
      code: invalidOverflow,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Use prop `overflow="auto"` instead',
        },
      ],
    },
    {
      code: invalidPosition,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Use prop `position="absolute"` instead',
        },
      ],
    },
    {
      code: invalidTop,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Instead of dangerously styling top, use the "top" boolean prop',
        },
      ],
    },
    {
      code: invalidRight,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Instead of dangerously styling right, use the "right" boolean prop',
        },
      ],
    },
    {
      code: invalidBoxShadow,
      errors: [
        {
          message:
            'Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n' +
            '  Use prop `borderStyle="shadow"` instead',
        },
      ],
    },
  ],
});
