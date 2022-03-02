import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../link_deprecate_disabled_prop', () =>
  Object.assign(jest.requireActual('../link_deprecate_disabled_prop'), {
    parser: 'flow',
  }),
);

describe('link_deprecate_disabled_prop', () => {
  ['link_deprecate_disabled_prop', 'rename-link_deprecate_disabled_prop'].forEach((test) => {
    defineTest(__dirname, 'link_deprecate_disabled_prop', { quote: 'single' }, test);
  });
});
