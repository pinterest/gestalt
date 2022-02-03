import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../rename-popover-handleKeyDown-to-onKeyDown', () =>
  Object.assign(jest.requireActual('../rename-popover-handleKeyDown-to-onKeyDown'), {
    parser: 'flow',
  }),
);

describe('rename-popover-handleKeyDown-to-onKeyDown', () => {
  [
    'rename-popover-handleKeyDown-to-onKeyDown',
    'rename-renamed-popover-handleKeyDown-to-onKeyDown',
  ].forEach((test) => {
    defineTest(__dirname, 'rename-popover-handleKeyDown-to-onKeyDown', { quote: 'single' }, test);
  });
});
