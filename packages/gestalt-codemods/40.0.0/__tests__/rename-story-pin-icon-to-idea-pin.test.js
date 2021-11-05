import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../rename-story-pin-icon-to-idea-pin', () =>
  Object.assign(jest.requireActual('../rename-story-pin-icon-to-idea-pin'), {
    parser: 'flow',
  }),
);

describe('rename-story-pin-icon-to-idea-pin', () => {
  ['rename-story-pin-icon-to-idea-pin'].forEach((test) => {
    defineTest(__dirname, 'rename-story-pin-icon-to-idea-pin', { quote: 'single' }, test);
  });
});
