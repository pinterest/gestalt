import {
  getPathFormatterByRuleName,
  getRuleTester,
  getTestTypePrepender,
  readTestByPath,
} from './helpers/testHelpers';
import rule from './only-valid-tokens';

const ruleName = 'only-valid-tokens';
const ruleTester = getRuleTester();
const pathFormatter = getPathFormatterByRuleName(ruleName);
const validPrepender = getTestTypePrepender('valid');
const invalidPrepender = getTestTypePrepender('invalid');

const buildInvalidTest = (name: string) => readTestByPath(pathFormatter(invalidPrepender(name)));

const validCode = readTestByPath(pathFormatter(validPrepender('valid')));

const dangerouslySetInlineStyleInput = buildInvalidTest('dangerouslySetInlineStyle-input');
const dangerouslySetInlineStyleOutput = buildInvalidTest('dangerouslySetInlineStyle-output');

const inlineInput = buildInvalidTest('inline-input');
const inlineOutput = buildInvalidTest('inline-output');

const unsafeCssInput = buildInvalidTest('unsafeCss-input');
const unsafeCssOutput = buildInvalidTest('unsafeCss-output');

const variableInput = buildInvalidTest('variable-input');
const variableOutput = buildInvalidTest('variable-output');

const messageColorBorderError = `This string contains Gestalt hard-coded strings tokens: 'var(--color-border-error)'. Replace with equivalent constant: import { TOKEN_COLOR_BORDER_ERROR } from 'gestalt-design-tokens'.`;

const messageColorBorderContainer = `This string contains Gestalt hard-coded strings tokens: 'var(--color-border-container)'. Replace with equivalent constant: import { TOKEN_COLOR_BORDER_CONTAINER } from 'gestalt-design-tokens'.`;

const messageColorWhiteMochimalist = `This string contains Gestalt hard-coded strings tokens: 'var(--color-white-mochimalist-0)'. Replace with equivalent constant: import { TOKEN_COLOR_WHITE_MOCHIMALIST_0 } from 'gestalt-design-tokens'.`;

const messageColorBackgroundDefault = `This string contains Gestalt hard-coded strings tokens: 'var(--color-background-default)'. Replace with equivalent constant: import { TOKEN_COLOR_BACKGROUND_DEFAULT } from 'gestalt-design-tokens'.`;

ruleTester.run('only-valid-tokens', rule, {
  valid: [{ code: validCode }],
  invalid: [
    [dangerouslySetInlineStyleInput, dangerouslySetInlineStyleOutput, messageColorBorderContainer],
    [inlineInput, inlineOutput, messageColorBorderError],
    [unsafeCssInput, unsafeCssOutput, messageColorBackgroundDefault],
    [variableInput, variableOutput, messageColorWhiteMochimalist],
    // @ts-expect-error - TS2345 - Argument of type '([input, output, message]: [any, any, any]) => { code: any; output: any; errors: { message: any; }[]; }' is not assignable to parameter of type '(value: string[], index: number, array: string[][]) => { code: any; output: any; errors: { message: any; }[]; }'.
  ].map(([input, output, message]: [any, any, any]) => ({
    code: input,
    output,
    errors: [{ message }],
  })),
});
