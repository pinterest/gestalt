// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Web ButtonLink Accessibility check', async ({ page }) => {
  await page.goto('/web/buttonLink');
  await expectAccessiblePage({ page });
});
