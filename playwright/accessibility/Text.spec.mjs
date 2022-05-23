// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Text Accessibility check', async ({ page }) => {
  await page.goto('/text');
  await expectAccessiblePage({ page });
});
