import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../convert-font-weight', () =>
  Object.assign(jest.requireActual('../convert-font-weight'), {
    parser: 'flow',
  }),
);

describe('convert-font-weight', () => {
  [
    'convert-font-weight-dynamic',
    'convert-font-weight-false',
    'convert-font-weight-spread',
    'convert-font-weight-static',
  ].forEach((test) => {
    defineTest(__dirname, 'convert-font-weight', { quote: 'single' }, test);
  });
});
