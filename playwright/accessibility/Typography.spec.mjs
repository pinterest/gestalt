// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Typography Accessibility check', async ({ page }) => {
  await page.goto('/web/typography');
  await expectAccessiblePage({ page });
});
