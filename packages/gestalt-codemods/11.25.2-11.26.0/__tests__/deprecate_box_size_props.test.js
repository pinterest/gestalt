import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../deprecate_box_size_props', () => {
  return Object.assign(jest.requireActual('../deprecate_box_size_props'), {
    parser: 'flow',
  });
});

describe('deprecate_box_size_props', () => {
  ['deprecate_box_size_props'].forEach(test => {
    defineTest(
      __dirname,
      'deprecate_box_size_props',
      { quote: 'single' },
      test
    );
  });
});
