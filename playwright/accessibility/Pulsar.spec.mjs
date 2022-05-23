// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Pulsar Accessibility check', async ({ page }) => {
  await page.goto('/pulsar');
  await expectAccessiblePage({ page });
});
