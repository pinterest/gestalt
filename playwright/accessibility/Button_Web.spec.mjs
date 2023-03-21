// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Web Button Accessibility check', async ({ page }) => {
  await page.goto('/web/button');
  await expectAccessiblePage({ page });
});
