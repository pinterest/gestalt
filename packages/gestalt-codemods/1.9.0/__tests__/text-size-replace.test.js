import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../text-size-replace', () => Object.assign(jest.requireActual('../text-size-replace'), {
    parser: 'flow',
  }));

describe('text-size-replace', () => {
  [
    'text-size-replace-xs',
    'text-size-replace-sm',
    'text-size-replace-md',
    'text-size-replace-lg',
    'text-size-replace-xl',
  ].forEach((test) => {
    defineTest(__dirname, 'text-size-replace', { quote: 'single' }, test);
  });
});
