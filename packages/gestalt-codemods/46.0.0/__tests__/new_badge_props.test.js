import { defineTest } from 'jscodeshift/dist/testUtils';

jest.mock('../new_badge_props', () =>
  Object.assign(jest.requireActual('../new_badge_props'), {
    parser: 'flow',
  }),
);

describe('new_badge_props', () => {
  ['accordion_badge_prop', 'accordion_expandable_badge_prop', 'dropdown_badge_prop'].forEach(
    (test) => {
      defineTest(__dirname, 'new_badge_props', { quote: 'single' }, test);
    },
  );
});
