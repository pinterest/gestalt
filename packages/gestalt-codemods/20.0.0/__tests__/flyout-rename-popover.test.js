import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../flyout-rename-popover', () =>
  Object.assign(jest.requireActual('../flyout-rename-popover'), {
    parser: 'flow',
  }),
);

describe('flyout-rename-popover', () => {
  ['flyoutAlias-rename-popover', 'flyout-rename-popover'].forEach((test) => {
    defineTest(__dirname, 'flyout-rename-popover', { quote: 'single' }, test);
  });
});
