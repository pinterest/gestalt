import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../button-remove-textColor-prop', () => {
  return Object.assign(jest.requireActual('../button-remove-textColor-prop'), {
    parser: 'flow',
  });
});

describe('button-remove-textColor-prop', () => {
  ['button-remove-textColor-prop'].forEach((test) => {
    defineTest(__dirname, 'button-remove-textColor-prop', { quote: 'single' }, test);
  });
});
