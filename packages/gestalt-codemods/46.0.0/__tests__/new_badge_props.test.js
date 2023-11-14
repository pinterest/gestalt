import { defineTest } from 'jscodeshift/dist/testUtils';

jest.mock('../new_badge_props', () =>
  Object.assign(jest.requireActual('../new_badge_props'), {
    parser: 'flow',
  }),
);

describe('new_badge_props', () => {
  ['module_badge_prop', 'module_expandable_badge_prop', 'dropdown_badge_prop'].forEach((test) => {
    defineTest(__dirname, 'new_badge_props', { quote: 'single' }, test);
  });
});
