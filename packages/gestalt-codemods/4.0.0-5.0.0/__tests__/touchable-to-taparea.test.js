import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../touchable-to-taparea', () => {
  return Object.assign(jest.requireActual('../touchable-to-taparea'), {
    parser: 'flow',
  });
});

describe('touchable-to-taparea', () => {
  [
    'touchable-to-taparea-1',
    'touchable-to-taparea-2',
    'touchable-to-taparea-3',
  ].forEach(test => {
    defineTest(__dirname, 'touchable-to-taparea', { quote: 'single' }, test);
  });
});
