import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../future-typo-changes', () =>
  Object.assign(jest.requireActual('../future-typo-changes'), {
    parser: 'flow',
  }),
);

describe('future-typo-changes', () => {
  [
    'text-sm',
    'heading-sm',
    'text-md',
    'heading-md',
    'text-lg',
    'heading-lg',
    'text-numbers-to-string',
    'heading-numbers-to-string',
  ].forEach((test) => {
    defineTest(__dirname, 'future-typo-changes', { quote: 'single' }, test);
  });
});
