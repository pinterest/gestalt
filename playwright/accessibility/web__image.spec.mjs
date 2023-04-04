// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('Image Accessibility check', async ({ page }) => {
  await page.goto('/web/image');
  await expectAccessiblePage({ page });
});
