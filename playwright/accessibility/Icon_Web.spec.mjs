// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Icon Accessibility check', async ({ page }) => {
  await page.goto('/web/icon');
  await expectAccessiblePage({ page });
});
