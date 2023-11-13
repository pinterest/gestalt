import { defineTest } from 'jscodeshift/dist/testUtils';

jest.mock('../deprecatedPadding-box-replace', () =>
  Object.assign(jest.requireActual('../deprecatedPadding-box-replace'), {
    parser: 'flow',
  }),
);

describe('deprecatedPadding-box-replace', () => {
  ['deprecatedPadding-box-replace'].forEach((test) => {
    defineTest(__dirname, 'deprecatedPadding-box-replace', { quote: 'single' }, test);
  });
});
