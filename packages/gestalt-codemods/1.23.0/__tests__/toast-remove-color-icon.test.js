import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../toast-remove-color-icon', () => Object.assign(jest.requireActual('../toast-remove-color-icon'), {
    parser: 'flow',
  }));

describe('toast-remove-color-icon', () => {
  ['toast-remove-color-icon-both', 'toast-remove-color-icon-single'].forEach((test) => {
    defineTest(__dirname, 'toast-remove-color-icon', { quote: 'single' }, test);
  });
});
