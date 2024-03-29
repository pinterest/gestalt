import { defineTest } from 'jscodeshift/dist/testUtils';

jest.mock('../callout-upsell-primary-secondary-action-replace-primary-secondary-link', () =>
  Object.assign(
    jest.requireActual('../callout-upsell-primary-secondary-action-replace-primary-secondary-link'),
    {
      parser: 'flow',
    },
  ),
);

describe('callout-upsell-primary-secondary-action-replace-primary-secondary-link', () => {
  ['callout-upsell-primary-secondary-action-replace-primary-secondary-link'].forEach((test) => {
    defineTest(
      __dirname,
      'callout-upsell-primary-secondary-action-replace-primary-secondary-link',
      { quote: 'single' },
      test,
    );
  });
});
