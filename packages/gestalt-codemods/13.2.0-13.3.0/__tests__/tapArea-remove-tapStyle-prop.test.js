import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../tapArea-remove-tapStyle-prop', () => {
  return Object.assign(jest.requireActual('../tapArea-remove-tapStyle-prop'), {
    parser: 'flow',
  });
});

describe('tapArea-remove-tapStyle-prop', () => {
  ['tapArea-remove-tapStyle-prop'].forEach(test => {
    defineTest(
      __dirname,
      'tapArea-remove-tapStyle-prop',
      { quote: 'single' },
      test
    );
  });
});
