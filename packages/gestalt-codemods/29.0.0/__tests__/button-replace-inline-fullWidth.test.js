import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../button-replace-inline-fullWidth', () => Object.assign(jest.requireActual('../button-replace-inline-fullWidth'), {
    parser: 'flow',
  }));

describe('button-replace-inline-fullWidth', () => {
  ['button-replace-inline-fullWidth'].forEach((test) => {
    defineTest(__dirname, 'button-replace-inline-fullWidth', { quote: 'single' }, test);
  });
});
