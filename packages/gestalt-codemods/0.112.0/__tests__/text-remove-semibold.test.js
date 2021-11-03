import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../text-remove-semibold', () => Object.assign(jest.requireActual('../text-remove-semibold'), {
    parser: 'flow',
  }));

describe('text-remove-semibold', () => {
  [
    'text-remove-semibold-dynamic-bold-first',
    'text-remove-semibold-dynamic-semibold-first',
    'text-remove-semibold-dynamic-normal',
    'text-remove-semibold-static',
  ].forEach((test) => {
    defineTest(__dirname, 'text-remove-semibold', { quote: 'single' }, test);
  });
});
