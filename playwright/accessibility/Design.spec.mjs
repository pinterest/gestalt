// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Design Accessibility check', async ({ page }) => {
  await page.goto('/design');
  await expectAccessiblePage({ page });
});
