import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../link-remove-deprecated-props', () => {
  return Object.assign(jest.requireActual('../link-remove-deprecated-props'), {
    parser: 'flow',
  });
});

describe('link-remove-deprecated-props', () => {
  ['link-remove-deprecated-props'].forEach(test => {
    defineTest(
      __dirname,
      'link-remove-deprecated-props',
      { quote: 'single' },
      test
    );
  });
});
