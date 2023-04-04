// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Sticky Accessibility check', async ({ page }) => {
  await page.goto('/web/sticky');
  await expectAccessiblePage({ page });
});
