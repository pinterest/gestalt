import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../toast-change-color-prop', () => Object.assign(jest.requireActual('../toast-change-color-prop'), {
    parser: 'flow',
  }));

describe('toast-change-color-prop', () => {
  ['toast-change-color-prop'].forEach((test) => {
    defineTest(__dirname, 'toast-change-color-prop', { quote: 'single' }, test);
  });
});
