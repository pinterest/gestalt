import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../leading-text-remove', () => {
  return Object.assign(jest.requireActual('../leading-text-remove'), {
    parser: 'flow',
  });
});

describe('leading-text-remove', () => {
  ['leading-text-remove'].forEach((test) => {
    defineTest(__dirname, 'leading-text-remove', { quote: 'single' }, test);
  });
});
