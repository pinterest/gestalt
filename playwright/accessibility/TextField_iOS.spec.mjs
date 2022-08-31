// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('iOS TextField Accessibility check', async ({ page }) => {
  await page.goto('/iOS/textfield');
  await expectAccessiblePage({ page });
});
