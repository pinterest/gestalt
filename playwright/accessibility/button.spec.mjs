// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Button Accessibility check', async ({ page }) => {
  await page.goto('/button');
  await expectAccessiblePage({ page });
});
