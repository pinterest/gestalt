// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Illustration guidelines Accessibility check', async ({ page }) => {
  await page.goto('/foundations/illustration');
  await expectAccessiblePage({ page });
});
