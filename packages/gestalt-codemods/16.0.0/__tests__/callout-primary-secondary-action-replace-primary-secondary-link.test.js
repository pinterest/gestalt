import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock(
  '../callout-primary-secondary-action-replace-primary-secondary-link',
  () => {
    return Object.assign(
      jest.requireActual(
        '../callout-primary-secondary-action-replace-primary-secondary-link'
      ),
      {
        parser: 'flow',
      }
    );
  }
);

describe('callout-primary-secondary-action-replace-primary-secondary-link', () => {
  ['callout-primary-secondary-action-replace-primary-secondary-link'].forEach(
    (test) => {
      defineTest(
        __dirname,
        'callout-primary-secondary-action-replace-primary-secondary-link',
        { quote: 'single' },
        test
      );
    }
  );
});
