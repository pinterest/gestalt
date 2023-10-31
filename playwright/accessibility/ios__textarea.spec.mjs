// @flow strict
import { test } from '@playwright/test';
import expectAccessiblePage from './expectAccessiblePage.mjs';

test('iOS TextArea Accessibility check', async ({ page }) => {
  await page.goto('/ios/textarea');
  await expectAccessiblePage({ page });
});
