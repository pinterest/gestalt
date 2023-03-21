// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Masonry Accessibility check', async ({ page }) => {
  await page.goto('/web/masonry');
  await expectAccessiblePage({ page });
});
