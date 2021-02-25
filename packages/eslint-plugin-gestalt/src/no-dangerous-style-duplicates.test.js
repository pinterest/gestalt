// @flow strict
import { RuleTester } from 'eslint';
import { readFileSync } from 'fs';
import path from 'path';
import rule from './no-dangerous-style-duplicates.js';

const ruleTester = new RuleTester();

const parserOptions = {
  sourceType: 'module',
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  },
};

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
  valid: [
    {
      code: validCode,
      parserOptions,
    },
  ],
  invalid: [
    {
      code: invalidMultiple,
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
      parserOptions,
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
