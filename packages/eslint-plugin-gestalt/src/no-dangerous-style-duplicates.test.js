// @flow strict
import {
  getPathFormatterByRuleName,
  getRuleTester,
  getTestTypePrepender,
  readTestByPath,
} from './helpers/testHelpers.js';
import rule from './no-dangerous-style-duplicates.js';
import { generateDefaultMessage } from './helpers/styleHelpers.js';

const ruleName = 'no-dangerous-style-duplicates';
const ruleTester = getRuleTester();
const pathFormatter = getPathFormatterByRuleName(ruleName);
const validPrepender = getTestTypePrepender('valid');
const invalidPrepender = getTestTypePrepender('invalid');

const validCode = readTestByPath(pathFormatter(validPrepender('valid')));

const buildInvalidTest = (name) => readTestByPath(pathFormatter(invalidPrepender(name)));

const invalidBackgroundColorInput = buildInvalidTest('invalid-backgroundColor-input');
const invalidBackgroundColorOutput = buildInvalidTest('invalid-backgroundColor-output');
const invalidBorderInput = buildInvalidTest('invalid-border-input');
const invalidBorderOutput = buildInvalidTest('invalid-border-output');
const invalidBorderRadiusInput = buildInvalidTest('invalid-borderRadius-input');
const invalidBorderRadiusOutput = buildInvalidTest('invalid-borderRadius-output');
const invalidBottomInput = buildInvalidTest('invalid-bottom-input');
const invalidBottomOutput = buildInvalidTest('invalid-bottom-output');
const invalidBoxShadowInput = buildInvalidTest('invalid-boxShadow-input');
const invalidBoxShadowOutput = buildInvalidTest('invalid-boxShadow-output');
const invalidInVariableInput = buildInvalidTest('invalid-in-variable-input');
const invalidInVariableOutput = buildInvalidTest('invalid-in-variable-output');
const invalidLeftInput = buildInvalidTest('invalid-left-input');
const invalidLeftOutput = buildInvalidTest('invalid-left-output');
const invalidMinHeightInput = buildInvalidTest('invalid-minHeight-input');
const invalidMinHeightOutput = buildInvalidTest('invalid-minHeight-output');
const invalidMinWidthInput = buildInvalidTest('invalid-minWidth-input');
const invalidMinWidthOutput = buildInvalidTest('invalid-minWidth-output');
const invalidMaxHeightInput = buildInvalidTest('invalid-maxHeight-input');
const invalidMaxHeightOutput = buildInvalidTest('invalid-maxHeight-output');
const invalidMaxWidthInput = buildInvalidTest('invalid-maxWidth-input');
const invalidMaxWidthOutput = buildInvalidTest('invalid-maxWidth-output');
const invalidMarginNegativeInput = buildInvalidTest('invalid-margin-negative-input');
const invalidMarginNegativeOutput = buildInvalidTest('invalid-margin-negative-output');
const invalidMarginLeftInput = buildInvalidTest('invalid-marginLeft-input');
const invalidMarginLeftOutput = buildInvalidTest('invalid-marginLeft-output');
const invalidMarginTopInput = buildInvalidTest('invalid-marginTop-input');
const invalidMarginTopOutput = buildInvalidTest('invalid-marginTop-output');
const invalidMultipleInput = buildInvalidTest('invalid-multiple-input');
const invalidMultipleOutput = buildInvalidTest('invalid-multiple-output');
const invalidMultipleKeysInput = buildInvalidTest('invalid-multiple-keys-input');
const invalidMultipleKeysOutput = buildInvalidTest('invalid-multiple-keys-output');
const invalidOpacityInput = buildInvalidTest('invalid-opacity-input');
const invalidOpacityOutput = buildInvalidTest('invalid-opacity-output');
const invalidOverflowInput = buildInvalidTest('invalid-overflow-input');
const invalidOverflowOutput = buildInvalidTest('invalid-overflow-output');
const invalidPaddingInput = buildInvalidTest('invalid-padding-input');
const invalidPaddingOutput = buildInvalidTest('invalid-padding-output');
const invalidPositionInput = buildInvalidTest('invalid-position-input');
const invalidPositionOutput = buildInvalidTest('invalid-position-output');
const invalidRightInput = buildInvalidTest('invalid-right-input');
const invalidRightOutput = buildInvalidTest('invalid-right-output');
const invalidTopInput = buildInvalidTest('invalid-top-input');
const invalidTopOutput = buildInvalidTest('invalid-top-output');

const getErrorMessage = (error) =>
  `Unnecessary Box dangerous styles found. https://gestalt.netlify.app/Box\n${error ?? ''}`;

ruleTester.run('no-dangerous-style-duplicates', rule, {
  valid: [{ code: validCode }],
  invalid: [
    [
      invalidBackgroundColorInput,
      invalidBackgroundColorOutput,
      generateDefaultMessage(`color="white"`),
    ],
    [invalidBorderInput, invalidBorderOutput, generateDefaultMessage(`borderStyle="lg"`)],
    [
      invalidBorderRadiusInput,
      invalidBorderRadiusOutput,
      generateDefaultMessage(`rounding="circle"`),
    ],
    [invalidBottomInput, invalidBottomOutput, generateDefaultMessage(`bottom`)],
    [invalidBoxShadowInput, invalidBoxShadowOutput, generateDefaultMessage(`borderStyle="shadow"`)],
    [invalidInVariableInput, invalidInVariableOutput, generateDefaultMessage(`color="white"`)],
    [invalidLeftInput, invalidLeftOutput, generateDefaultMessage(`left`)],
    [
      invalidMarginNegativeInput,
      invalidMarginNegativeOutput,
      generateDefaultMessage(`margin={-2}`),
    ],
    [invalidMarginLeftInput, invalidMarginLeftOutput, generateDefaultMessage(`marginStart={2}`)],
    [invalidMarginTopInput, invalidMarginTopOutput, generateDefaultMessage(`marginTop={1}`)],
    [invalidMaxHeightInput, invalidMaxHeightOutput, generateDefaultMessage(`maxHeight={8}`)],
    [invalidMaxWidthInput, invalidMaxWidthOutput, generateDefaultMessage(`maxWidth={8}`)],
    [invalidMinHeightInput, invalidMinHeightOutput, generateDefaultMessage(`minHeight="100%"`)],
    [invalidMinWidthInput, invalidMinWidthOutput, generateDefaultMessage(`minWidth="100%"`)],
    [
      invalidMultipleInput,
      invalidMultipleOutput,
      `${generateDefaultMessage('color="white"') ?? ''}\n${generateDefaultMessage('top') ?? ''}\n${
        generateDefaultMessage('marginStart={2}') ?? ''
      }`,
    ],
    [
      invalidMultipleKeysInput,
      invalidMultipleKeysOutput,
      generateDefaultMessage(`top`),
      [{ onlyKeys: ['top'] }],
    ],
    [invalidOpacityInput, invalidOpacityOutput, generateDefaultMessage(`opacity={0.9}`)],
    [invalidOverflowInput, invalidOverflowOutput, generateDefaultMessage(`overflow="auto"`)],
    [invalidPaddingInput, invalidPaddingOutput, generateDefaultMessage(`padding={0}`)],
    [invalidPositionInput, invalidPositionOutput, generateDefaultMessage(`position="absolute"`)],
    [invalidRightInput, invalidRightOutput, generateDefaultMessage(`right`)],
    [invalidTopInput, invalidTopOutput, generateDefaultMessage(`top`)],
  ].map(([input, output, errors, options]) => ({
    code: input,
    options: options ?? [],
    output,
    errors: [{ message: getErrorMessage(errors) }],
  })),
});
