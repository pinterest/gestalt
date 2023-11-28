import { defineTest } from 'jscodeshift/dist/testUtils';

jest.mock('../modal-remove-close-label', () =>
  Object.assign(jest.requireActual('../modal-remove-close-label'), {
    parser: 'flow',
  }),
);

describe('modal-remove-close-label', () => {
  ['modal-remove-close-label'].forEach((test) => {
    defineTest(__dirname, 'modal-remove-close-label', { quote: 'single' }, test);
  });
});
