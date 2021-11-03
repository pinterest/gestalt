import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../text-align-rename', () => Object.assign(jest.requireActual('../text-align-rename'), {
    parser: 'flow',
  }));

describe('text-align-rename', () => {
  ['text-align-rename'].forEach((test) => {
    defineTest(__dirname, 'text-align-rename', {}, test);
  });
});
