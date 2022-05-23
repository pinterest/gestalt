// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('ActivationCard Accessibility check', async ({ page }) => {
  await page.goto('/activationcard');
  await expectAccessiblePage({ page });
});
