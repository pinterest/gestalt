import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../deprecatedPadding-box-replace', () => {
  return Object.assign(jest.requireActual('../deprecatedPadding-box-replace'), {
    parser: 'flow',
  });
});

describe('deprecatedPadding-box-replace', () => {
  ['deprecatedPadding-box-replace'].forEach((test) => {
    defineTest(__dirname, 'deprecatedPadding-box-replace', { quote: 'single' }, test);
  });
});
