import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../remove-responsive-text-sizing', () =>
  Object.assign(jest.requireActual('../remove-responsive-text-sizing'), {
    parser: 'flow',
  }),
);

describe('remove-responsive-text-sizing', () => {
  ['remove-responsive-text-sizing-transform'].forEach((test) => {
    defineTest(__dirname, 'remove-responsive-text-sizing', { quote: 'single' }, test);
  });
});
