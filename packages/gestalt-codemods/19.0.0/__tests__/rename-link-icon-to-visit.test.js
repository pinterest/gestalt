import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../rename-link-icon-to-visit', () => Object.assign(jest.requireActual('../rename-link-icon-to-visit'), {
    parser: 'flow',
  }));

describe('rename-link-icon-to-visit', () => {
  ['rename-link-icon-to-visit'].forEach((test) => {
    defineTest(__dirname, 'rename-link-icon-to-visit', { quote: 'single' }, test);
  });
});
