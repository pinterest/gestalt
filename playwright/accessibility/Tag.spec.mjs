// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Tag Accessibility check', async ({ page }) => {
  await page.goto('/tag');
  await expectAccessiblePage({ page });
});
