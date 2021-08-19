// @flow strict
import {
  getPathFormatterByRuleName,
  getRuleTester,
  getTestTypePrepender,
  readTestByPath,
} from './testHelpers.js';
import rule from './no-dangerous-style-duplicates.js';

const ruleName = 'no-dangerous-style-duplicates';
const ruleTester = getRuleTester();
const pathFormatter = getPathFormatterByRuleName(ruleName);
const validPrepender = getTestTypePrepender('valid');
const invalidPrepender = getTestTypePrepender('invalid');

const validCode = readTestByPath(pathFormatter(validPrepender('valid')));

const buildInvalidTest = (name) => readTestByPath(pathFormatter(invalidPrepender(name)));

const invalidMultiple = buildInvalidTest('invalid-multiple');
const invalidInVariable = buildInvalidTest('invalid-in-variable');
const invalidBackgroundColor = buildInvalidTest('invalid-backgroundColor');
const invalidBottom = buildInvalidTest('invalid-bottom');
const invalidBorder = buildInvalidTest('invalid-border');
const invalidBoxShadow = buildInvalidTest('invalid-boxShadow');
const invalidBorderRadius = buildInvalidTest('invalid-borderRadius');
const invalidLeft = buildInvalidTest('invalid-left');
const invalidMarginNegative = buildInvalidTest('invalid-margin-negative');
const invalidMarginLeft = buildInvalidTest('invalid-marginLeft');
const invalidMarginTop = buildInvalidTest('invalid-marginTop');
const invalidMaxHeight = buildInvalidTest('invalid-maxHeight');
const invalidMaxWidth = buildInvalidTest('invalid-maxWidth');
const invalidMinHeight = buildInvalidTest('invalid-minHeight');
const invalidMinWidth = buildInvalidTest('invalid-minWidth');
const invalidPadding = buildInvalidTest('invalid-padding');
const invalidOpacity = buildInvalidTest('invalid-opacity');
const invalidOverflow = buildInvalidTest('invalid-overflow');
const invalidPosition = buildInvalidTest('invalid-position');
const invalidTop = buildInvalidTest('invalid-top');
const invalidRight = buildInvalidTest('invalid-right');

const getErrorMessage = (error) =>
  `Un-needed Box dangerous styles found. https://gestalt.netlify.app/Box\n${error}`;

ruleTester.run('no-dangerous-style-duplicates', rule, {
  valid: [{ code: validCode }],
  invalid: [
    [
      invalidMultiple,
      [
        `  Use prop \`color="white"\` instead`,
        `  Instead of dangerously styling top, use the "top" boolean prop`,
      ],
    ],
    [
      invalidMultiple,
      ['  Instead of dangerously styling top, use the "top" boolean prop'],
      [{ onlyKeys: ['top'] }],
    ],
    [invalidInVariable, ['  Use prop `color="white"` instead']],
    [invalidBackgroundColor, ['  Use prop `color="white"` instead']],
    [invalidBorder, ['  Use prop `borderStyle="lg"` instead']],
    [invalidBorderRadius, ['  Use prop `rounding="circle"` instead']],
    [invalidBottom, ['  Instead of dangerously styling bottom, use the "bottom" boolean prop']],
    [invalidLeft, ['  Instead of dangerously styling left, use the "left" boolean prop']],
    [invalidMarginNegative, ['  Use prop `margin={-2}` instead']],
    [invalidMarginLeft, ['  Use prop `marginStart={2}` instead']],
    [invalidMarginTop, ['  Use prop `marginTop={1}` instead']],
    [invalidMaxHeight, ['  Use prop `maxHeight={pixels}` or `maxHeight="percentage%"` instead']],
    [invalidMaxWidth, ['  Use prop `maxWidth={pixels}` or `maxWidth="percentage%"` instead']],
    [invalidMinHeight, ['  Use prop `minHeight={pixels}` or `minHeight="percentage%"` instead']],
    [invalidMinWidth, ['  Use prop `minWidth={pixels}` or `minWidth="percentage%"` instead']],
    [invalidPadding, ['  Use prop `padding={0}` instead']],
    [invalidOpacity, ['  Use prop `opacity={0.9}` instead']],
    [invalidOverflow, ['  Use prop `overflow="auto"` instead']],
    [invalidPosition, ['  Use prop `position="absolute"` instead']],
    [invalidTop, ['  Instead of dangerously styling top, use the "top" boolean prop']],
    [invalidRight, ['  Instead of dangerously styling right, use the "right" boolean prop']],
    [invalidBoxShadow, ['  Use prop `borderStyle="shadow"` instead']],
  ].map(([code, errors, options]) => ({
    code,
    options: options ?? [],
    errors: errors.map((error) => ({
      message: getErrorMessage(error),
    })),
  })),
});
