import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../callout-rename-description-message', () => Object.assign(jest.requireActual('../callout-rename-description-message'), {
    parser: 'flow',
  }));

describe('callout-rename-description-message', () => {
  ['callout-rename-description-message'].forEach((test) => {
    defineTest(__dirname, 'callout-rename-description-message', { quote: 'single' }, test);
  });
});
