import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../remove-text-size-xl', () => {
  return Object.assign(require.requireActual('../remove-text-size-xl'), {
    parser: 'flow',
  });
});

describe('remove-text-size-xl', () => {
  ['remove-text-size-xl-sm', 'remove-text-size-xl-xl'].forEach(test => {
    defineTest(__dirname, 'remove-text-size-xl', { quote: 'single' }, test);
  });
});
