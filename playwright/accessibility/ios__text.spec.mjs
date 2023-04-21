// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('iOS Text Accessibility check', async ({ page }) => {
  await page.goto('/ios/text');
  await expectAccessiblePage({ page });
});
