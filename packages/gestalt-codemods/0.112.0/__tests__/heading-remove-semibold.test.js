import { defineTest } from 'jscodeshift/dist/testUtils';

jest.mock('../heading-remove-semibold', () =>
  Object.assign(jest.requireActual('../heading-remove-semibold'), {
    parser: 'flow',
  }),
);

describe('heading-remove-semibold', () => {
  ['heading-remove-semibold-dynamic', 'heading-remove-semibold-static'].forEach((test) => {
    defineTest(__dirname, 'heading-remove-semibold', { quote: 'single' }, test);
  });
});
