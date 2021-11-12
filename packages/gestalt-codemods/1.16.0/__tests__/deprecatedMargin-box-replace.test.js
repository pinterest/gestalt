import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../deprecatedMargin-box-replace', () =>
  Object.assign(jest.requireActual('../deprecatedMargin-box-replace'), {
    parser: 'flow',
  }),
);

describe('deprecatedMargin-box-replace', () => {
  ['deprecatedMargin-box-replace'].forEach((test) => {
    defineTest(__dirname, 'deprecatedMargin-box-replace', { quote: 'single' }, test);
  });
});
