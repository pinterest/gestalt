import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock(
  '../upsell-primary-secondary-action-replace-primary-secondary-link',
  () => {
    return Object.assign(
      jest.requireActual(
        '../upsell-primary-secondary-action-replace-primary-secondary-link'
      ),
      {
        parser: 'flow',
      }
    );
  }
);

describe('upsell-primary-secondary-action-replace-primary-secondary-link', () => {
  ['upsell-primary-secondary-action-replace-primary-secondary-link'].forEach(
    (test) => {
      defineTest(
        __dirname,
        'upsell-primary-secondary-action-replace-primary-secondary-link',
        { quote: 'single' },
        test
      );
    }
  );
});
