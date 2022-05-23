// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('SlimBanner Accessibility check', async ({ page }) => {
  await page.goto('/slimbanner');
  await expectAccessiblePage({ page });
});
