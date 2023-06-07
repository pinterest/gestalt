// @flow strict
import rule from './no-box-dangerous-style-duplicates.js';
import { generateDefaultMessage } from './helpers/noBoxDangerousStyleDuplicatesReducer.js';
import {
  getPathFormatterByRuleName,
  getRuleTester,
  getTestTypePrepender,
  readTestByPath,
} from './helpers/testHelpers.js';

const ruleName = 'no-box-dangerous-style-duplicates';
const ruleTester = getRuleTester();
const pathFormatter = getPathFormatterByRuleName(ruleName);
const validPrepender = getTestTypePrepender('valid');
const invalidPrepender = getTestTypePrepender('invalid');

const validCode = readTestByPath(pathFormatter(validPrepender('valid')));

const buildInvalidTest = (name: string) => readTestByPath(pathFormatter(invalidPrepender(name)));

const invalidAlignContentInput = buildInvalidTest('invalid-alignContent-input');
const invalidAlignContentOutput = buildInvalidTest('invalid-alignContent-output');
const invalidAlignItemsInput = buildInvalidTest('invalid-alignItems-input');
const invalidAlignItemsOutput = buildInvalidTest('invalid-alignItems-output');
const invalidAlignSelfInput = buildInvalidTest('invalid-alignSelf-input');
const invalidAlignSelfOutput = buildInvalidTest('invalid-alignSelf-output');
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
const invalidDisplayInput = buildInvalidTest('invalid-display-input');
const invalidDisplayOutput = buildInvalidTest('invalid-display-output');
const invalidFlexInput = buildInvalidTest('invalid-flex-input');
const invalidFlexOutput = buildInvalidTest('invalid-flex-output');
const invalidHeightInput = buildInvalidTest('invalid-height-input');
const invalidHeightOutput = buildInvalidTest('invalid-height-output');
const invalidInVariableInput = buildInvalidTest('invalid-in-variable-input');
const invalidInVariableOutput = buildInvalidTest('invalid-in-variable-output');
const invalidJustifyContentInput = buildInvalidTest('invalid-justifyContent-input');
const invalidJustifyContentOutput = buildInvalidTest('invalid-justifyContent-output');
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
const invalidMultipleKeysNoAutofix = buildInvalidTest('invalid-multiple-keys-no-autofix');
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
const invalidRoleInput = buildInvalidTest('invalid-role-input');
const invalidRoleOutput = buildInvalidTest('invalid-role-output');
const invalidTopInput = buildInvalidTest('invalid-top-input');
const invalidTopOutput = buildInvalidTest('invalid-top-output');
const invalidWidthInput = buildInvalidTest('invalid-width-input');
const invalidWidthOutput = buildInvalidTest('invalid-width-output');
const invalidWrapInput = buildInvalidTest('invalid-wrap-input');
const invalidWrapOutput = buildInvalidTest('invalid-wrap-output');
const invalidZIndexInput = buildInvalidTest('invalid-zIndex-input');
const invalidZIndexOutput = buildInvalidTest('invalid-zIndex-output');

const getErrorMessage = (error: ?string) =>
  `Unnecessary Box dangerous styles found. https://gestalt.pinterest.systems/Box\n${error ?? ''}`;

ruleTester.run('no-box-dangerous-style-duplicates', rule, {
  valid: [{ code: validCode }],
  invalid: [
    [
      invalidAlignContentInput,
      invalidAlignContentOutput,
      generateDefaultMessage(`alignContent="between"`),
    ],
    [
      invalidAlignItemsInput,
      invalidAlignItemsOutput,
      generateDefaultMessage(`alignItems="baseline"`),
    ],
    [invalidAlignSelfInput, invalidAlignSelfOutput, generateDefaultMessage(`alignSelf="start"`)],
    [
      invalidBackgroundColorInput,
      invalidBackgroundColorOutput,
      generateDefaultMessage(`color="default"`),
    ],
    [invalidBorderInput, invalidBorderOutput, generateDefaultMessage(`borderStyle="lg"`)],
    [
      invalidBorderRadiusInput,
      invalidBorderRadiusOutput,
      generateDefaultMessage(`rounding="circle"`),
    ],
    [invalidBottomInput, invalidBottomOutput, generateDefaultMessage(`bottom`)],
    [invalidBoxShadowInput, invalidBoxShadowOutput, generateDefaultMessage(`borderStyle="shadow"`)],
    [invalidDisplayInput, invalidDisplayOutput, generateDefaultMessage(`display="inlineBlock"`)],
    [invalidFlexInput, invalidFlexOutput, generateDefaultMessage(`flex="grow"`)],
    [invalidInVariableInput, invalidInVariableOutput, generateDefaultMessage(`color="default"`)],
    [
      invalidJustifyContentInput,
      invalidJustifyContentOutput,
      generateDefaultMessage(`justifyContent="between"`),
    ],
    [invalidLeftInput, invalidLeftOutput, generateDefaultMessage(`left`)],
    [
      invalidMarginNegativeInput,
      invalidMarginNegativeOutput,
      generateDefaultMessage(`margin={-2}`),
    ],
    [invalidMarginLeftInput, invalidMarginLeftOutput, generateDefaultMessage(`marginStart={2}`)],
    [invalidMarginTopInput, invalidMarginTopOutput, generateDefaultMessage(`marginTop={1}`)],

    [invalidHeightInput, invalidHeightOutput, generateDefaultMessage(`height={8}`)],
    [invalidWidthInput, invalidWidthOutput, generateDefaultMessage(`width={8}`)],
    [invalidMaxHeightInput, invalidMaxHeightOutput, generateDefaultMessage(`maxHeight={8}`)],
    [invalidMaxWidthInput, invalidMaxWidthOutput, generateDefaultMessage(`fit`)],
    [invalidMinHeightInput, invalidMinHeightOutput, generateDefaultMessage(`minHeight="100%"`)],
    [invalidMinWidthInput, invalidMinWidthOutput, generateDefaultMessage(`minWidth="100%"`)],
    [
      invalidMultipleInput,
      invalidMultipleOutput,
      `${generateDefaultMessage('color="default"') ?? ''}\n${
        generateDefaultMessage('top') ?? ''
      }\n${generateDefaultMessage('marginStart={2}') ?? ''}`,
    ],
    [
      invalidMultipleKeysInput,
      invalidMultipleKeysOutput,
      generateDefaultMessage(`top`),
      [{ onlyKeys: ['top'] }],
    ],
    [
      invalidMultipleKeysNoAutofix,
      invalidMultipleKeysNoAutofix,
      generateDefaultMessage(`top`),
      [{ onlyKeys: ['top'] }],
    ],
    [invalidOpacityInput, invalidOpacityOutput, generateDefaultMessage(`opacity={0.9}`)],
    [invalidOverflowInput, invalidOverflowOutput, generateDefaultMessage(`overflow="auto"`)],
    [invalidPaddingInput, invalidPaddingOutput, generateDefaultMessage(`padding={0}`)],
    [invalidPositionInput, invalidPositionOutput, generateDefaultMessage(`position="absolute"`)],
    [invalidRightInput, invalidRightOutput, generateDefaultMessage(`right`)],
    [invalidRoleInput, invalidRoleOutput, generateDefaultMessage(`role="banner"`)],
    [invalidTopInput, invalidTopOutput, generateDefaultMessage(`top`)],
    [invalidWrapInput, invalidWrapOutput, generateDefaultMessage(`wrap`)],
    [
      invalidZIndexInput,
      invalidZIndexOutput,
      generateDefaultMessage(`zIndex={new FixedZIndex(1000)}`),
    ],
  ].map(([input, output, errors, options]) => ({
    code: input,
    options: options ?? [],
    output,
    errors: [{ message: getErrorMessage(errors) }],
  })),
});
