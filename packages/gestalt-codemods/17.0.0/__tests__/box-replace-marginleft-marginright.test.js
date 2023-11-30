import { defineTest } from 'jscodeshift/dist/testUtils';

jest.mock('../box-replace-marginleft-marginright', () =>
  Object.assign(jest.requireActual('../box-replace-marginleft-marginright'), {
    parser: 'flow',
  }),
);

describe('box-replace-marginleft-marginright', () => {
  ['box-replace-marginleft-marginright'].forEach((test) => {
    defineTest(__dirname, 'box-replace-marginleft-marginright', { quote: 'single' }, test);
  });
});
