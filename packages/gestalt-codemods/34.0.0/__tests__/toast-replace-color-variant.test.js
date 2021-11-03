import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../toast-replace-color-variant', () => Object.assign(jest.requireActual('../toast-replace-color-variant'), {
    parser: 'flow',
  }));

describe('toast-replace-color-variant', () => {
  [
    'color-red',
    'color-white',
    'empty-string-color',
    'no-color',
    'null-color',
    'renamed',
    'ternary-color',
    'undefined-color',
    'variable-color',
  ].forEach((test) => {
    defineTest(__dirname, 'toast-replace-color-variant', { quote: 'single' }, test);
  });
});
