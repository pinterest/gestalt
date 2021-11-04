import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../heading-size-replace', () =>
  Object.assign(jest.requireActual('../heading-size-replace'), {
    parser: 'flow',
  }),
);

describe('heading-size-replace', () => {
  [
    'heading-size-replace-xs',
    'heading-size-replace-sm',
    'heading-size-replace-md',
    'heading-size-replace-lg',
    'heading-size-replace-xl',
  ].forEach((test) => {
    defineTest(__dirname, 'heading-size-replace', { quote: 'single' }, test);
  });
});
